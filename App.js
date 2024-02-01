import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Restaraunts from "./components/Restaraunts";
import { COLORS } from "./constants/theme";

export default function App() {
  return (
    // <View style={styles.container}>
    <View
      style={{
        paddingTop: 50,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: "red",
      }}
    >
      <Header />
      <Restaraunts />
      {/* <View style={{ backgroundColor: "black" }}> */}
      <Categories />
      {/* </View> */}
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
