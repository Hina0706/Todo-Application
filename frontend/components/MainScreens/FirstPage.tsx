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
    fontSize: 25,
    marginBottom: 100,
    color: 'darkslategrey',
    textAlign: 'center',
  },
  providerButton: {
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  providerButtonText: {
    paddingRight: 20,
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
    color: 'red',
  },
});
