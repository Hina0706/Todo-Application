import {userDatabase} from '../../App';
import {doc, updateDoc, setDoc, deleteField, getDoc} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const auth = getAuth();
const currUser = auth.currentUser;
const eventRef = doc(userDatabase, 'events', currUser.uid);

export async function addTodoDB(category, priority, start, end, todo) {
  const eventId = new Date().getTime().toString();
  const event = [eventId, category, priority, start, end, todo, false];
  await updateDoc(eventRef, {[`${eventId}`]: event});
  return eventId;
}

export async function initializeTodoDB() {
  const eventId = new Date().getTime().toString();
  const event = [];
  await setDoc(eventRef, {[`${eventId}`]: event});
}

export async function deleteTodoDB(eventId) {
  await updateDoc(eventRef, {[`${eventId}`]: deleteField()});
}

export async function toggleCompletedDB(eventId) {
  const eventsDoc = await getDoc(doc(userDatabase, 'events', currUser.uid));
  const events = eventsDoc.data();
  const updatedEvent = events[eventId];
  updatedEvent[6] = !updatedEvent[6];
  await updateDoc(eventRef, {[`${eventId}`]: updatedEvent});
}

export async function referCategory() {
  const eventsDoc = await getDoc(doc(userDatabase, 'events', currUser.uid));
  const events = eventsDoc.data();
  const categories = new Set();
  Object.entries(events).forEach(([value]) => {
    if (value.length > 5) {
      categories.add(value[1]);
    }
  });
  return [categories];
}
