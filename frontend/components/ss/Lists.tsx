import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';

const Header_Add = () => {
  return (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.item}>Add List</Text>
    </TouchableOpacity>
  );
};

const Header_Time = ({onPress}) => {
  return (
    <TouchableOpacity
      style={styles.item}
      accessibilityRole="button"
      onPress={onPress}>
      <Text style={styles.item}>Event Time</Text>
    </TouchableOpacity>
  );
}

export default function ShowLists() {
  const [visible, setVisible] = useState(false);

  const ChangeVisible = () => {
    setVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* header */}
      <Header_Add />
      <Header_Time onPress={ChangeVisible} />

      {/* event lists */}
      <ScrollView style={{paddingTop: 20}}>
        <Collapse style={styles.separator}>
          <CollapseHeader style={{backgroundColor: '#E6E6E6'}}>
            <View>
              <Text style={styles.category}>Sports</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <Text style={styles.events}>PingPong</Text>
          </CollapseBody>
        </Collapse>
      </ScrollView>
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
    paddingTop: 20,
  },
  item: {
    padding: 10,
    fontSize: 20,
    height: 40,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#808080',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
  category: {
    backgroundColor: '#808080',
    color: '#ffffff',
    padding: 10,
    fontSize: 18,
    height: 40,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  events: {
    padding: 10,
    fontSize: 18,
    height: 40,
    marginLeft: 5,
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
