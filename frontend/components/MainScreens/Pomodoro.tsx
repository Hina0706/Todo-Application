import {StyleSheet, View, Slider} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  TimerCountDown,
  TimerToggle,
  TimerMode,
} from '../ComponentScreens/Pomodoro/Timer';

export default function Pomodoro() {
  const [timerCount, setTimerCount] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timer | null>(null);
  const [isTimeRunning, setIsTimeRunning] = useState<boolean>(false);
  const [timerMode, setTimerMode] = useState<'Focus' | 'Break'>('Focus');

  const handleSliderChange = (value: number) => {
    setTimerCount(value);
  };

  useEffect(() => {
    if (timerCount === 0) {
      if (timerMode === 'Focus') {
        setTimerMode('Break');
        setTimerCount(timerCount);
      } else {
        setTimerMode('Focus');
        setTimerCount(timerCount);
      }
      StopTimer();
    }
  }, [timerCount]);

  const StartTimer = () => {
    setIsTimeRunning(true);
    const id = setInterval(() => setTimerCount(prev => prev - 1000), 1000);
    setTimerInterval(id);
  };

  const StopTimer = () => {
    if (timerInterval != null) {
      clearInterval(timerInterval);
    }
    setIsTimeRunning(false);
  };

  return (
    <View
      style={{
        ...styles.container,
        ...{backgroundColor: timerMode === 'Break' ? '#E0EEE0' : '#FFE4E1'},
      }}>
      <TimerMode timerMode={timerMode} />
      <Slider
        style={{width: 300, height: 40, opacity: 0.7}}
        minimumValue={0 * 60 * 1000}
        maximumValue={60 * 60 * 1000}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        step={5 * 60 * 1000}
        value={timerCount}
        onValueChange={handleSliderChange}
      />
      <TimerCountDown timerDate={new Date(timerCount)} />
      <TimerToggle
        isTimeRunning={isTimeRunning}
        StartTimer={StartTimer}
        StopTimer={StopTimer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    fontSize: 18,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  circleSlider: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
