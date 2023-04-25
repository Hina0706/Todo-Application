import {
  StyleSheet,
  View,
  Slider,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  TimerCountDown,
  TimerToggle,
  TimerMode,
} from '../ComponentScreens/Pomodoro/Timer';
//import {referCategory} from '../../../backend/database/todoDB';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {getCategoriesRD} from '../redux/actions/todoSlice';
import {useDispatch} from 'react-redux';

export default function Pomodoro() {
  const [timerCount, setTimerCount] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timer | null>(null);
  const [isTimeRunning, setIsTimeRunning] = useState<boolean>(false);
  const [timerMode, setTimerMode] = useState<'Focus' | 'Break'>('Focus');
  const [categories, setCategories] = useState([]);
  const [selectedCate, setSelectedCate] = useState('');
  const dispatch = useDispatch();

  const handleSliderChange = (value: number) => {
    setTimerCount(value);
  };

  // useEffect(() => {
  //   async function getCategories() {
  //     const q = await getCategoriesRD();
  //     setCategories(q);
  //   }
  //   getCategories();
  // }, []);

  // function getCategories() {
  //   const q = await getCategoriesRD();
  //   setCategories(q);
  // }
  // const handleCate = () => {
  //   getCategoriesRD()
  //     .then((response: any) => {
  //       setCategories(response.data);
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //     });
  // };

  const cateSelection = () => {
    const handleCateSelection = cate => {
      setSelectedCate(cate);
    };
    return (
      <View>
        {categories.map((cate, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleCateSelection(cate)}
            style={styles.categoryContainer}>
            <Text style={styles.category}>{cate}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
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
      {/* <Collapse>
        <CollapseHeader onPress={handleCate}>
          <Text style={styles.categories}>
            Category{': '}
            {selectedCate ? selectedCate : null}
          </Text>
        </CollapseHeader>
        <CollapseBody>{cateSelection()}</CollapseBody>
      </Collapse> */}
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
  circleSlider: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categories: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    opacity: 0.5,
  },
  category: {
    color: 'black',
    fontSize: 20,
    opacity: 0.5,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  categoryContainer: {
    backgroundColor: '#FFFFF0',
    height: 30,
    width: '100%',
  },
});
