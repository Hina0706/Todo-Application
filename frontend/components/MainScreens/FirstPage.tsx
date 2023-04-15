import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

export function FirstPage({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.containerMain}>
        <Text style={styles.headerText}>Log In</Text>
        <TouchableOpacity
          style={styles.providerButton}
          onPress={() => navigation.navigate('LogIn')}>
          <Text style={styles.providerButtonText}>Use Email</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => navigation.navigate('Register')}>
        <Text>
          Don't have an account?
          <Text style={styles.buttomText}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerMain: {
    flex: 1,
    padding: 100,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 40,
    marginBottom: 100,
    color: '#838B83',
    textAlign: 'center',
  },
  providerButton: {
    borderColor: 'lightgrey',
    borderWidth: 2,
    borderStyle: 'solid',
    padding: 10,
    alignItems: 'center',
    width: '100%',
    height: 50,
  },
  providerButtonText: {
    paddingRight: 20,
    fontSize: 20,
    color: '#838B8B',
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
