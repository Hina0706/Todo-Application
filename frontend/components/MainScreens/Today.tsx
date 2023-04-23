import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {toggleComplete, deleteTodo} from '../redux/actions/todoSlice';
import {useDispatch} from 'react-redux';
import Swipeable from 'react-native-swipeable';
import {getAuth} from 'firebase/auth';
import {
  deleteTodoDB,
  toggleCompletedDB,
} from '../../../backend/database/todoDB';

// single todo item
const TodoItem = ({
  id,
  title,
  completed,
  category,
  selectedStartTime,
  selectedEndTime,
  priority,
}) => {
  const dispatch = useDispatch();
  const toggleCompleted = useCallback(() => {
    toggleCompletedDB(id).then(() => {
      dispatch(toggleComplete({id: id, completed: !completed}));
    });
  }, [id, completed, dispatch]);

  const deleteEvent = useCallback(() => {
    deleteTodoDB(id).then(() => {
      //console.log(id);
      dispatch(deleteTodo({id: id}));
    });
  }, [id, dispatch]);

  // const handleEdit = () => {
  //   if (navigation) {
  //     navigation.navigate('EditEvents', {
  //       existingTodo: title,
  //       existingCategory: category,
  //       existingStartTime: selectedStartTime,
  //       existingEndTime: selectedEndTime,
  //       existingPriority: priority,
  //     });
  //   }
  // };
  let titleTextStyle = styles.titleText;
  let timerTextStyle = styles.timeText;
  let categoryTextStyle = styles.categoryText;
  switch (priority) {
    case 'High':
      titleTextStyle = {
        ...styles.titleText,
        color: completed ? '#CDC0B0' : '#A52A2A',
        textDecorationLine: completed ? 'line-through' : null,
      };
      timerTextStyle = {
        ...styles.timeText,
        color: completed ? '#CDC0B0' : '#A52A2A',
      };
      categoryTextStyle = {
        ...styles.categoryText,
        color: completed ? '#CDC0B0' : '#A52A2A',
      };
      break;
    case 'Medium':
      titleTextStyle = {
        ...styles.titleText,
        color: completed ? '#CDC0B0' : '#FFA54F',
        textDecorationLine: completed ? 'line-through' : null,
      };
      timerTextStyle = {
        ...styles.timeText,
        color: completed ? '#CDC0B0' : '#FFA54F',
      };
      categoryTextStyle = {
        ...styles.categoryText,
        color: completed ? '#CDC0B0' : '#FFA54F',
      };
      break;
    case 'Low':
      titleTextStyle = {
        ...styles.titleText,
        color: completed ? '#CDC0B0' : '#CDC5BF',
        textDecorationLine: completed ? 'line-through' : null,
      };
      timerTextStyle = {
        ...styles.timeText,
        color: completed ? '#CDC0B0' : '#CDC5BF',
      };
      categoryTextStyle = {
        ...styles.categoryText,
        color: completed ? '#CDC0B0' : '#CDC5BF',
      };
      break;
  }

  return (
    <View style={{backgroundColor: completed ? '#EEE9E9' : '#FFE4E1'}}>
      <Swipeable
        leftButtons={leftButtons}
        rightButtons={rightButtons}
        onLeftActionRelease={toggleCompleted}
        onRightActionRelease={deleteEvent}>
        {/* <TouchableOpacity onPress={handleEdit}> */}
        <Text style={titleTextStyle}>{title}</Text>
        <View style={{flexDirection: 'row', alignContent: 'space-around'}}>
          <Text style={categoryTextStyle}>{category}</Text>
          <Text style={timerTextStyle}>
            {selectedStartTime.getHours().toLocaleString()} :{' '}
            {selectedStartTime.getMinutes().toLocaleString()} -
            {selectedEndTime.getHours().toLocaleString()} :{' '}
            {selectedEndTime.getMinutes().toLocaleString()}
          </Text>
        </View>
        {/* </TouchableOpacity> */}
      </Swipeable>
    </View>
  );
};

const rightButtons = [
  <TouchableHighlight>
    <Text>Delete ❌</Text>
  </TouchableHighlight>,
];
const leftButtons = [
  <TouchableHighlight>
    <Text>Completed ✅</Text>
  </TouchableHighlight>,
];

const today = new Date();
// render the screen
export default function Today({}) {
  const auth = getAuth();
  const currUser = auth.currentUser;
  const todos = useSelector(state =>
    state.todos.filter(todo => {
      const todoStartTime = todo && new Date(todo.selectedStartTime);
      return (
        todo &&
        todo.user === currUser.uid &&
        todoStartTime.getDate() === today.getDate() &&
        todoStartTime.getMonth() === today.getMonth() &&
        todoStartTime.getFullYear() === today.getFullYear()
      );
    }),
  );
  todos.sort((a, b) => {
    if (a.selectedStartTime < b.selectedStartTime) {
      return -1;
    } else if (a.selectedStartTime > b.selectedStartTime) {
      return 1;
    }
    if (a.priority < b.priority) {
      return -1;
    } else if (a.priority > b.priority) {
      return 1;
    }
    return 0;
  });

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>
          {today.getMonth()}-{today.getDate()}-{today.getFullYear()}
        </Text>
      </View>
      <ScrollView>
        {todos.map(todo => (
          <TodoItem
            //navigation={navigation}
            id={todo.id}
            title={todo.todo}
            completed={todo.completed}
            category={todo.category}
            selectedStartTime={todo.selectedStartTime}
            selectedEndTime={todo.selectedEndTime}
            priority={todo.priority}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 15,
    color: 'black',
    textDecorationLine: null,
  },
  categoryText: {
    fontSize: 18,
    marginTop: 5,
    marginRight: 'auto',
    fontWeight: 'bold',
    color: 'black',
  },
  timeText: {
    fontSize: 18,
    marginTop: 5,
    color: 'black',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  dateContainer: {
    backgroundColor: '#FFFAFA',
    height: 60,
    width: '100%',
  },
  dateText: {
    marginTop: 10,
    fontSize: 30,
    color: '#8B814C',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
