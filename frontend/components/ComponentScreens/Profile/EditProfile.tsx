import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import {getAuth, updateProfile} from 'firebase/auth';
import {useDispatch} from 'react-redux';
import {setActiveUser} from '../../redux/actions/userSlice';
import {launchCamera, launchImageLibrary, ImagePicker} from 'react-native-image-picker';
import ActionSheet from 'react-native-actionsheet';
// import { takeFromCamera, takeFromLibrary } from '../../ss/UploadImg';

export function EditProfile({navigation}) {
  const auth = getAuth();
  const [userName, setUserName] = useState(auth.currentUser?.displayName);
  const [userImg, setUserImg] = useState(auth.currentUser?.photoURL);
  const dispatch = useDispatch();
  let actionSheet = useRef(null);
  let optionArray = ['Take Photo', 'Choose from library', 'cancel'];
  const showActionSheet = () => {
    actionSheet.current.show();
  };
  const handleSave = () => {
    if (auth.currentUser !== null) {
      updateProfile(auth.currentUser, {
        displayName: userName,
        photoURL: userImg,
      })
        .then(() => {
          console.log('updated!');
          dispatch(
            setActiveUser({
              userName: userName,
              userImg: userImg,
            }),
          );
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
      navigation.goBack();
    }
  };
  const takeFromCamera = async () => {
    const img = await ImagePicker.launchCamera({
      mediaType: 'photo',
      cameraType: 'front',
    });
    if (!img.didCancel) {
      setUserImg(img.uri);
    }
  };
  const takeFromLibrary = async () => {
    let img = await ImagePicker.launchImageLibrary({
      mediaType: ImagePicker.MediaTypeOptions.All,
    });
    if (!img.didCancel) {
      setUserImg(img.uri);
    }
  };
  const handleButtonPress = index => {
    switch (index) {
      case 0:
        takeFromCamera();
        break;
      case 1:
        takeFromLibrary();
        break;
      default:
        break;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={showActionSheet}>
          <Image
            source={userImg ? {uri: userImg} : null}
            style={styles.avatar}
          />
          <Text style={styles.text}>Profile Photo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.text}>User Name</Text>
        <TextInput
          placeholder="User Name"
          style={styles.textInput}
          onChangeText={text => {
            setUserName(text);
          }}
        />
      </View>
      <TouchableOpacity style={styles.saveButtomContainer} onPress={handleSave}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
      <ActionSheet
        ref={actionSheet}
        title={'Select a photo'}
        options={optionArray}
        cancelButtonIndex={2}
        destructiveButtonIndex={3}
        onPress={handleButtonPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E0EEE0',
  },
  textInput: {
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: '#CDCDCD',
    marginBottom: 20,
  },
  text: {
    color: '#2F4F4F',
    fontSize: 16,
    marginBottom: 15,
    marginTop: 10,
    fontWeight: 'bold',
  },
  sectionContainer: {
    paddingVertical: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  avatarContainer: {
    padding: 20,
    alignItems: 'center',
  },
  saveButtomContainer: {
    width: '100%',
    height: 35,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2E8B57',
  },
  saveText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  id: {
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: '#CDCDCD',
    opacity: 0.5,
  },
});
