import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {
  setActiveUser,
  selectUserName,
  selectUserImg,
} from '../../redux/actions/userSlice';

export function ProfileBody() {
  const auth = getAuth();
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const userImg = useSelector(selectUserImg);
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      dispatch(
        setActiveUser({
          userEmail: user?.email,
          userName: user?.displayName,
          userImg: user?.photoURL,
          userId: user?.uid,
        }),
      );
    });
  });
  return (
    <View>
      <View style={styles.profileImageContainer}>
        <Image source={{uri: userImg}} style={styles.profileImage} />
      </View>
      <View style={styles.accountNameContainer}>
        <Text style={styles.accountNameText}>{userName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 'bold',
    color: 'white',
  },
  editProfileButtomContainer: {
    width: '100%',
    height: 35,
    borderRadius: 5,
    borderColor: '#DEDEDE',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  accountNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  accountNameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  accountFeather: {
    fontSize: 20,
    color: 'black',
    paddingHorizontal: 5,
    opacity: 0.5,
  },
  profileImage: {
    resizeMode: 'cover',
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  profileImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  introContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  introText: {
    fontSize: 15,
  },
  log: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 5,
  },
});
