import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {toggleComplete, deleteTodo} from '../redux/actions/todoSlice';
import {useDispatch} from 'react-redux';
import Swipeable from 'react-native-swipeable';
import {getAuth} from 'firebase/auth';

const TodoItem = ({
  navigation,
  id,
  title,
  completed,
  category,
  selectedStartTime,
  selectedEndTime,
  priority,
}) => {
  const dispatch = useDispatch();
  const toggleCompleted = () => {
    dispatch(toggleComplete({id: id, completed: !completed}));
  };
  const deleteEvent = () => {
    dispatch(deleteTodo({id: id}));
  };
  const handleEdit = () => {
    if (navigation) {
      navigation.navigate('EditEvents', {
        existingTodo: title,
        existingCategory: category,
        existingStartTime: selectedStartTime,
        existingEndTime: selectedEndTime,
        existingPriority: priority,
      });
    }
  };
  return (
    <View style={{backgroundColor: completed ? 'blue' : 'red'}}>
      <Swipeable
        leftButtons={leftButtons}
        rightButtons={rightButtons}
        onLeftActionRelease={toggleCompleted}
        onRightActionRelease={deleteEvent}>
        <TouchableOpacity style={styles.text} onPress={handleEdit}>
          <Text>{title}</Text>
          <Text>{category}</Text>
          <Text>
            {selectedStartTime.toLocaleString()} -
            {selectedEndTime.toLocaleString()}
          </Text>
          <Text>{priority}</Text>
        </TouchableOpacity>
      </Swipeable>
    </View>
  );
};

const rightButtons = [<TouchableHighlight><Text>Delete</Text></TouchableHighlight>,];
const leftButtons = [<TouchableHighlight><Text>Completed</Text></TouchableHighlight>,];

export default function Today({navigation}) {
  const auth = getAuth();
  const currUser = auth.currentUser;
  const todos = useSelector(state =>
    state.todos.filter(todo => {
      const todoStartTime = new Date(todo.selectedStartTime);
      const today = new Date();
      return (
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
      <ScrollView>
        {todos.map(todo => (
          <TodoItem
            navigation={navigation}
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
});
