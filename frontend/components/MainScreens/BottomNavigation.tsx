import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Button, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Today from './Today';
import Pomodoro from './Pomodoro';
import ProfileScreen from './Profile';
import {EditProfile} from '../ComponentScreens/Profile/EditProfile';
import AddEvents from '../ComponentScreens/Today/AddEvents';
import EditEvents from '../ComponentScreens/Today/EditEvents';
import {NavigationContainer} from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const TodayStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

function TodayNavigation() {
  return (
    <TodayStack.Navigator>
      <TodayStack.Screen
        name="Today"
        component={Today}
        options={({navigation}) => ({
          headerRight: () => (
            <Button
              title="Add Event"
              onPress={() => navigation.navigate('AddEvents')}></Button>
          ),
        })}
      />
      <TodayStack.Screen name="AddEvents" component={AddEvents} />
      <TodayStack.Screen name="EditEvents" component={EditEvents} />
    </TodayStack.Navigator>
  );
}

function ProfileNavigation() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Me" component={ProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfile} />
    </ProfileStack.Navigator>
  );
}

export default function SimpleBottomNavigation() {
  return (
    <NavigationContainer style={{flex: 1}}>
      <Tab.Navigator tabBarPosition="bottom">
        <Tab.Screen
          name="Today"
          component={TodayNavigation}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen name="Pomodoto" component={Pomodoro} />
        <Tab.Screen
          name="Me"
          component={ProfileNavigation}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
