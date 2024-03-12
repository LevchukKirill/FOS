import React from 'react';
import { View, Text, TextInput } from 'react-native';
// import { TextInput } from '../../node_modules/react-native-web/dist/cjs/index';

const Auth = () => {
  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder='useless placeholder'
        keyboardType='numeric'
      />
    </SafeAreaView>
  );
};

export default Auth;
