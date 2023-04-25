import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

type Props = {
  timerDate: Date;
  isTimeRunning: boolean;
  StopTimer: () => void;
  StartTimer: () => void;
  timerMode: 'Focus' | 'Break';
};

export const TimerCountDown: React.FC<Props> = ({timerDate}) => {
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
      <Text style={styles.textTimerMode}>
        {timerMode} Time {timerMode === 'Focus' ? '❗️' : '🙆🏼'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  TimerCountDownText: {
    fontSize: 40,
    fontWeight: '800',
    color: '#8B814C',
    marginBottom: 20,
    marginTop: 20,
    opacity: 0.7,
  },
  button: {
    fontSize: 30,
    fontWeight: '600',
    color: '#8B814C',
    opacity: 0.7,
  },
  textTimerMode: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    opacity: 0.5,
  },
  TimerCountDownContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
});
