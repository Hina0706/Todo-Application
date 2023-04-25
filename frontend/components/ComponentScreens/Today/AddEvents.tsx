import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  DatePickerIOS,
} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {Event} from '../../../../backend/database/todoDB';
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
      <CollapseHeader style={styles.collapseContainer}>
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
    const priorities = ['High', 'Medium', 'Low'];
    const handlePrioritySelection = pri => {
      handleSelectOption('priority', pri);
    };
    return (
      <View style={styles.choiceContainer}>
        {priorities.map((pri, index) => (
          <TouchableOpacity
            style={styles.priorityButton}
            key={index}
            onPress={() => handlePrioritySelection(pri)}>
            <Text style={styles.priorityText}>{pri}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const handleSave = useCallback(() => {
    const currUser = getAuth().currentUser;
    const newEvent = new Event(
      form.category,
      form.priority,
      form.selectedStartTime,
      form.selectedEndTime,
      form.todo,
      false,
    );
    newEvent.addTodoDB().then(id => {
      dispatch(
        addTodo({
          id: id,
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
  }, [form, navigation, dispatch]);

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
              style={styles.timerContainer}
              minimumDate={new Date()}
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
              style={styles.timerContainer}
              minimumDate={selectedStartTime}
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
    backgroundColor: '#E0EEE0',
  },
  saveButtomContainer: {
    width: '100%',
    height: 35,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2E8B57',
  },
  saveText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput: {
    fontSize: 30,
    borderBottomWidth: 1,
    borderColor: '#CDCDCD',
    marginBottom: 30,
    marginTop: 30,
  },
  sectionContainer: {
    paddingVertical: 10,
  },
  textLeft: {
    color: '#2F4F4F',
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    marginRight: 'auto',
  },
  textRight: {
    opacity: 0.5,
    color: '#556B2F',
    fontWeight: 'bold',
    fontSize: 20,
  },
  choiceContainer: {
    flexDirection: 'column',
  },
  priorityText: {
    fontSize: 16,
    marginBottom: 10,
  },
  priorityButton: {
    width: '100%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0FFF0',
  },
  collapseContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignContent: 'space-around',
  },
  timerContainer: {
    backgroundColor: '#F0FFF0',
  },
});
