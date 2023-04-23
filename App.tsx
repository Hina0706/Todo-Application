/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useMemo} from 'react';
import SimpleBottomNavigation from './frontend/components/MainScreens/BottomNavigation';
import {initializeApp} from 'firebase/app';
//import {getAnalytics} from 'firebase/analytics';
import {FirstPage} from './frontend/components/MainScreens/FirstPage';
import {View, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LogIn from './frontend/components/ComponentScreens/Authentication/LogIn';
import Register from './frontend/components/ComponentScreens/Authentication/Register';
import {NavigationContainer} from '@react-navigation/native';
import {Provider, useSelector} from 'react-redux';
import {selectAuth} from './frontend/components/redux/actions/userSlice';
import {userStore} from './my-app/src/app/store';
import {getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyBz2BjHEQryVJdeVFSHCSTGZPtRoko_4D4',
  authDomain: 'mytodo-7763a.firebaseapp.com',
  databaseURL: 'https://mytodo-7763a-default-rtdb.firebaseio.com',
  projectId: 'mytodo-7763a',
  storageBucket: 'mytodo-7763a.appspot.com',
  messagingSenderId: '787007590392',
  appId: '1:787007590392:web:c8628c159e42cb08be100d',
  measurementId: 'G-VRNF4R6Y35',
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const userDatabase = getFirestore(app);
//const analytics = getAnalytics(app);
const LogInStack = createNativeStackNavigator();

function LogInNavigation() {
  return (
    <NavigationContainer>
      <LogInStack.Navigator>
        <LogInStack.Screen
          name="1"
          component={FirstPage}
          options={{headerShown: false}}
        />
        <LogInStack.Screen name="LogIn" component={LogIn} />
        <LogInStack.Screen name="Register" component={Register} />
      </LogInStack.Navigator>
    </NavigationContainer>
  );
}

function MainPage() {
  const userAuth = useSelector(useMemo(() => selectAuth, []));
  // if (userAuth) {
  //   const auth = getAuth();
  //   const user = auth.currentUser;
  //   const dispatch = useDispatch();
  //   const eventsDoc = await getDoc(doc(userDatabase, 'events', user.uid));
  //   const events = eventsDoc.data();
  //   dispatch(
  //     setActiveUser({
  //       userName: user.displayName,
  //       userImg: user.photoURL,
  //     }),
  //   );
  //   Object.entries(events).forEach(([key, value]) => {
  //     dispatch(
  //       addTodo({
  //         id: value[0],
  //         todo: value[5],
  //         completed: value[6],
  //         category: value[1],
  //         selectedStartTime: value[3],
  //         selectedEndTime: value[4],
  //         priority: value[2],
  //         user: user.uid,
  //       }),
  //     );
  //   });
  // }
  return (
    <View style={styles.container}>
      {userAuth ? <SimpleBottomNavigation /> : <LogInNavigation />}
    </View>
  );
}

export default function App() {
  return (
    <Provider store={userStore}>
      <MainPage />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
