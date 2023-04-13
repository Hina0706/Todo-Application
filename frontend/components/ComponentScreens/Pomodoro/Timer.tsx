import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';


type Props = {
  timerDate: Date;
  isTimeRunning: boolean;
  StopTimer: () => void;
  StartTimer: () => void;
  timerMode: 'Focus' | 'Break';
};

export const TimerCountDown: React.FC<Props> = ({ timerDate }) => {
  return (
    <View>
      <Text style={styles.TimerCountDownText}>
        {timerDate.getMinutes().toString().padStart(2, '0')}:
        {timerDate.getSeconds().toString().padStart(2, '0')}
      </Text>
    </View>
  );
};

export const TimerToggle: React.FC<Props> = ({
  isTimeRunning,
  StopTimer,
  StartTimer,
}) => {
  return (
    <View>
      <TouchableOpacity onPress={isTimeRunning ? StopTimer : StartTimer}>
        <Text style={styles.button}>
          {isTimeRunning ? 'Stop Timer' : 'Start Timer'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const TimerMode: React.FC<Props> = ({timerMode}) => {
  return (
    <View>
      <Text style={styles.text}>
        {timerMode} Time {timerMode === 'Focus' ? '🍅' : '🥦'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  TimerCountDownText: {
    fontSize: 40,
    fontWeight: '800',
    color: '#fff',
  },
  button: {
    fontSize: 20,
    fontWeight: '500',
    color: 'blue',
    textDecorationLine: 'underline',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  TimerCountDownContainer: {
    alignItems: 'center',
  },
});
