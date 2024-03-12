import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, TextInput } from 'react-native';
import Header from './components/layout/Header/Header';
import Categories from './components/categories/Categories';
import Restaraunts from './components/restaurants/Restaraunts';
import { COLORS } from './constants/theme';
import { TextInput } from './node_modules/react-native-web/dist/cjs/index';

export default function App() {
  return (
    // <View style={styles.container}>
    <SafeAreaView style={styles.container}>
      <TextInput></TextIn>

      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style='auto' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: 'red',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
