import React, {Component} from 'react';
import {Text, View, TextInput} from 'react-native';
import Events from './Event';

enum Color{
  red = '#FF0000', /* red */
  yellow = '#FFFF00', /* yellow */
  blue = '#0000FF', /* blue */
}

interface CategoryProps {
  name: string;
  color: Color;
  duration: number;
  events: Events;
}

interface CategoryState {
  name: string;
  color: Color;
  duration: number;
  events: Events;
}

export default class Category extends Component<CategoryProps, CategoryState> {
  name: string | undefined;
  constructor(props: CategoryProps) {
    super(props);
    this.state = {
      name: props.name,
      color: props.color,
      duration: props.duration,
      events: props.events
    };
  }

  render() {
    return (
      <View>
        <Text>Name:</Text>
          <TextInput
            value={this.props.name}
            onChangeText={(name) => this.setState({name})}
          />
      </View>
    );
  };

