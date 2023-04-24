import {View} from 'react-native';
import AddEvents from '../ComponentScreens/Today/AddEvents';

export default function EditEvents({
  navigation,
  existingTodo,
  existingCategory,
  existingStartTime,
  existingEndTime,
  existingPriority,
}) {
  return (
    <View>
      <AddEvents
        navigation={navigation}
        todo={existingTodo}
        category={existingCategory}
        selectedStartTime={existingStartTime}
        selectedEndTime={existingEndTime}
        priority={existingPriority}
      />
    </View>
  );
}
