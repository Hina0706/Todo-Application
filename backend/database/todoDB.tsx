import {userDatabase} from '../../App';
import {doc, updateDoc, setDoc, deleteField, getDoc} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const auth = getAuth();
const currUser = auth.currentUser;
const eventRef = doc(userDatabase, 'events', currUser.uid);

// export async function referCategory() {
//   const eventsDoc = await getDoc(doc(userDatabase, 'events', currUser.uid));
//   const events = eventsDoc.data();
//   const categories = new Set();
//   Object.entries(events).forEach(([value]) => {
//     if (value.length > 5) {
//       categories.add(value[1]);
//     }
//   });
//   return [categories];
// }

export class Event {
  eventId: string;
  category: string;
  priority: string;
  start: Date;
  end: Date;
  todo: string;
  completed: boolean;

  constructor(
    category,
    priority,
    start,
    end,
    todo,
    completed = false,
    eventId = new Date().getTime().toString(),
  ) {
    this.category = category;
    this.priority = priority;
    this.start = start;
    this.end = end;
    this.todo = todo;
    this.completed = completed;
    this.eventId = eventId;
  }

  async addTodoDB() {
    const event = [
      this.eventId,
      this.category,
      this.priority,
      this.start,
      this.end,
      this.todo,
      false,
    ];
    await updateDoc(eventRef, {[`${this.eventId}`]: event});
    return this.eventId;
  }

  static async initializeTodoDB() {
    const eventId = new Date().getTime().toString();
    const event = [];
    await setDoc(eventRef, {[`${eventId}`]: event});
  }
  async deleteTodoDB(eventId) {
    await updateDoc(eventRef, {[`${eventId}`]: deleteField()});
  }
  async toggleCompletedDB(eventId) {
    const eventsDoc = await getDoc(doc(userDatabase, 'events', currUser.uid));
    const events = eventsDoc.data();
    const updatedEvent = events[eventId];
    updatedEvent[6] = !updatedEvent[6];
    await updateDoc(eventRef, {[`${eventId}`]: updatedEvent});
  }
};
