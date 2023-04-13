import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

type Props = {
  saveNote: (text: string) => void;
};

export const EventsTaking: React.FC<Props> = ({saveNote}) => {
  const [text, setText] = useState<string>('');

  return (
    <>
      <TextInput style={styles.textInput} value={text} onChangeText={setText} />
      <TouchableOpacity onPress={() => saveNote(text)}>
        <Text>Save Note</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#ffb70342',
    width: '100%',
    height: 200,
  },
});
