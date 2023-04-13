import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {ProfileBody} from '../ComponentScreens/Profile/ProfileBody';
import {setUserLogOut} from '../redux/actions/userSlice';
import {useDispatch} from 'react-redux';

export default function ProfileScreen({navigation}) {
  const dispatch = useDispatch();
  return (
    <View style={{width: '100%', height: '100%'}}>
      <View style={{width: '100%', padding: 10}}>
        <ProfileBody />
        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile')}
          style={styles.editProfileButtomContainer}>
          <Text style={styles.text}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.editProfileButtomContainer}
          onPress={() => dispatch(setUserLogOut())}>
          <Text style={styles.text}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  editProfileButtomContainer: {
    width: '100%',
    height: 35,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    marginTop: 30,
  },
  text: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 'bold',
    color: 'white',
  },
});
