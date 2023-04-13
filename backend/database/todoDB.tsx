import {userDatabase} from '../../App';
import {addDoc, collection, doc} from 'firebase/firestore';

const eventRef = collection(userDatabase, 'events');
export async function addTodoDB(category, priority, start, end, todo) {
  await addDoc(eventRef, {
    category: category,
    completed: false,
    priority: priority,
    selectedStartTime: start,
    selectedEndTime: end,
    todo: todo,
  });
}
