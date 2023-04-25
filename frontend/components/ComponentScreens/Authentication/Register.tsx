import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {useDispatch} from 'react-redux';
import {setUserAuth} from '../../redux/actions/userSlice';
import {Event} from '../../../../backend/database/todoDB';

export default function Register({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleRegister = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log('Registered with', user.email);
        Event.initializeTodoDB();
        dispatch(setUserAuth());
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <TextInput
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Email"
          style={styles.textInput}
        />
        <TextInput
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Password"
          secureTextEntry
          style={styles.textInput}
        />
        <TouchableOpacity onPress={handleRegister} style={styles.signInBottom}>
          <Text style={styles.signInText}>Register</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => navigation.navigate('LogIn')}>
        <Text>
          Already have an account?
          <Text style={styles.buttomText}>Log In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderColor: 'lightgrey',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 30,
    fontSize: 25,
  },
  signInBottom: {
    marginTop: 80,
    width: '100%',
    height: 35,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2E8B57',
  },
  signInText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomButton: {
    backgroundColor: 'ghostwhite',
    padding: 20,
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  buttomText: {
    fontWeight: 'bold',
    color: '#CD0000',
  },
});
