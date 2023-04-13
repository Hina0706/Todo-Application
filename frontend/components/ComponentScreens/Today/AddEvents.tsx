import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  DatePickerIOS,
  Button,
} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {addTodoDB} from '../../../../backend/database/todoDB';
import {addTodo} from '../../redux/actions/todoSlice';
import {useDispatch} from 'react-redux';
import {getAuth} from 'firebase/auth';

const TextInputField = ({label, value, onChange}) => {
  return (
    <TextInput
      style={styles.textInput}
      placeholder={label}
      value={value}
      onChangeText={onChange}
    />
  );
};

const CollapseField = ({headerLeft, headerRight, body}) => {
  return (
    <Collapse>
      <CollapseHeader>
        <Text style={styles.textLeft}>
          {headerLeft}
          <Text style={styles.textRight}>{headerRight}</Text>
        </Text>
      </CollapseHeader>
      <CollapseBody>{body}</CollapseBody>
    </Collapse>
  );
};

export default function AddEvents({
  navigation,
  todo,
  category,
  priority,
  selectedStartTime,
  selectedEndTime,
}) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    todo: todo || '',
    category: category || '',
    priority: priority || '',
    selectedStartTime: selectedStartTime || new Date(),
    selectedEndTime: selectedEndTime || new Date(),
    completed: false,
  });

  const handleInputChange = useCallback((name, value) => {
    setForm(prevForm => ({...prevForm, [name]: value}));
  }, []);

  const handleSelectOption = useCallback((name, value) => {
    setForm(prevForm => ({...prevForm, [name]: value}));
  }, []);

  const prioritySelection = () => {
    const priorities = ['None', 'High', 'Medium', 'Low'];
    const handlePrioritySelection = priority => {
      handleSelectOption('priority', priority);
    };
    return (
      <View style={styles.choiceContainer}>
        {priorities.map((priority, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePrioritySelection(priority)}>
            <Text style={styles.textInput}>{priority}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const handleSave = useCallback(() => {
    const currUser = getAuth().currentUser;
    addTodoDB(
      form.category,
      form.priority,
      form.selectedStartTime,
      form.selectedEndTime,
      form.todo,
    ).then(() => {
      console.log('updated!');
      dispatch(
        addTodo({
          todo: form.todo,
          category: form.category,
          selectedStartTime: form.selectedStartTime,
          selectedEndTime: form.selectedEndTime,
          priority: form.priority,
          user: currUser.uid,
        }),
      );
    });
    navigation.goBack();
  }, [form, navigation]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.sectionContainer}>
        <TextInputField
          label="New Todo"
          value={form.todo}
          onChange={value => handleInputChange('todo', value)}
        />
        <TextInputField
          label="Todo Category"
          value={form.category}
          onChange={value => handleInputChange('category', value)}
        />
        <CollapseField
          headerLeft={'Start At'}
          headerRight={form.selectedStartTime.toLocaleString()}
          body={
            <DatePickerIOS
              date={form.selectedStartTime}
              onDateChange={value =>
                handleInputChange('selectedStartTime', value)
              }
              mode="datetime"
            />
          }
        />
        <CollapseField
          headerLeft={'End At'}
          headerRight={form.selectedEndTime.toLocaleString()}
          body={
            <DatePickerIOS
              date={form.selectedEndTime}
              onDateChange={value =>
                handleInputChange('selectedEndTime', value)
              }
              mode="datetime"
            />
          }
        />
        <CollapseField
          headerLeft={'Priority'}
          headerRight={form.priority}
          body={prioritySelection()}
        />
      </View>
      <TouchableOpacity style={styles.saveButtomContainer} onPress={handleSave}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    marginBottom: 50,
  },
  saveButtomContainer: {
    width: '100%',
    height: 35,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  saveText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput: {
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: '#CDCDCD',
    marginBottom: 30,
  },
  sectionContainer: {
    paddingVertical: 10,
  },
  textLeft: {
    opacity: 0.5,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
  },
  textRight: {
    opacity: 0.5,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    alignItems: 'flex-end',
  },
  choiceContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
});
