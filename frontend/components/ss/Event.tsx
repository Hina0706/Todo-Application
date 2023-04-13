import React, {Component, useState} from 'react';
import { Text, View, TextInput, Switch} from 'react-native';
import Category from './Category';
import { Picker } from '@react-native-picker/picker';

enum Repetition{
  Daily = 'daily',
  TwoDay = '2 days',
  ThreeDay = '3 days',
  FourDay = '4 days',
  Weekly = 'weekly',
  BiWeekly = 'bi-weekly',
  Monthly = 'monthly',
  Yearly = 'yearly',
}

const repetition_options = [
  { label: 'Daily', value: 'daily' },
  { label: 'TwoDay', value: '2 days' },
  { label: 'ThreeDay', value: '3 days' },
  { label: 'FourDay', value: '4 days' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'BiWeekly', value: 'bi-weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' },
];

enum Priority{
  UrgentImportant = '#FF0000', /* red */
  OnlyImportant = '#FFFF00', /* yellow */
  Neither = '#0000FF', /* blue */
}

const priority_options = [
  { label: 'UrgentImportant', value: '#FF0000' },
  { label: 'OnlyImportant', value: '#FFFF00' },
  { label: 'Neither', value: '#0000FF' },
]

interface EventsProps {
  name: string;
  start_time: Date;
  end_time: Date;
  repetition: Repetition;
  priority: Priority;
  completeness: Boolean;
  category: Category;
}

interface EventsState {
  name: string;
  start_time: Date;
  end_time: Date;
  selected_repetition: Repetition;
  selected_priority: Priority;
  selected_completeness: Boolean;
  category: Category;
}

export default class Events extends Component<EventsProps, EventsState> {
  constructor(props: EventsProps) {
    super(props);
    this.state = {
      name: props.name,
      start_time: props.start_time,
      end_time: props.end_time,
      selected_repetition: Repetition.Daily,
      selected_priority: Priority.UrgentImportant,
      selected_completeness: false,
      category: props.category,
    };
  }

  repetitionChange = (repetition: Repetition) => {
    this.setState({ selected_repetition: repetition });
  };

  priorityChange = (priority: Priority) => {
    this.setState({ selected_priority: priority });
  };

  repetition_optionsItems = repetition_options.map((repetition_options) => (
    <Picker.Item key={repetition_options.value} label={repetition_options.label} value={repetition_options.value} />
  ));
  
  priority_optionsItems = priority_options.map((priority_options) => (
    <Picker.Item key={priority_options.value} label={priority_options.label} value={priority_options.value} />
  ));
  
  const [selected_completeness: any, setSelected_completeness: any] = useState(false);
  
  const switchCompleteness = (value: boolean) => {
    setSelected_completeness(!value)
  }
  
  render() {
    return (
      <View>
        <TextInput
          value={this.state.name}
          onChangeText={(name) => this.setState({name})}/>
        <TextInput
          value={this.state.start_time.toString()}
          onChangeText={(start_time) => this.setState({ start_time: new Date(start_time) })} />
        <TextInput
          value={this.state.end_time.toString()}
          onChangeText={(end_time) => this.setState({ end_time: new Date(end_time) })}
        />
        <TextInput
          value={this.state.end_time.toString()}
          onChangeText={(end_time) => this.setState({ end_time: new Date(end_time) })}
        />
        <Picker
          selectedValue={this.state.selected_repetition}
          onValueChange={this.repetitionChange}>
          {this.repetition_optionsItems}
        </Picker>
        <Picker
          selectedValue={this.state.selected_priority}
          onValueChange={this.priorityChange}>
          {this.priority_optionsItems}
        </Picker>
        <Switch value={this.state.selected_completeness} onValueChange={this.switchCompleteness} />
      </View>
    );
  };

