import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Button,
} from "react-native";
import Categories from "./components/categories/Categories";
import Restaraunts from "./components/restaurants/Restaraunts";
import { COLORS } from "./constants/theme";
import MainNavigator from "./components/layout/Navigation/MainNavigator.jsx";
import Header from "./components/layout/Header/Header.jsx";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <MainNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: COLORS.white,
    // display: "flex",
    flex: 1,
    justifyContent: "center",
  },
  input: {
    // borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
  },
  button: {
    // borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderColor: "black",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },
  asda: {},
});
