import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Button,
} from 'react-native';
import Categories from './components/categories/Categories';
import Restaraunts from './components/restaurants/Restaraunts';
import { COLORS } from './constants/theme';
import BottomNav from './components/layout/BottomNav/BottomNav.jsx';
import Header from './components/layout/Header/Header.jsx';

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: COLORS.white,
    flex: 1,
    backgroundColor: '#fff',

    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  button: {
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderColor: 'black',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
});
