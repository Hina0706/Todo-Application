import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function AddEvent() {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Modal
        visible={visible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setVisible(false)}>
        <View style={styles.modal}>
          <Text style={styles.text}>pop up successfully</Text>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <Text style={styles.button}>close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    fontSize: 18,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
