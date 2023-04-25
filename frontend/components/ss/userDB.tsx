import {addDoc, collection} from 'firebase/firestore';
import {userDatabase} from '../../../App';
import {getAuth} from 'firebase/auth';

export async function initializeProfile() {
  const auth = getAuth();
  const profileRef = await addDoc(collection(userDatabase, 'users'), {
    userName: auth.currentUser?.displayName,
    userImg: auth.currentUser?.photoURL,
  });
  console.log('Document written with ID: ', profileRef.id);
}
