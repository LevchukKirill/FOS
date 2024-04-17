import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { COLORS } from "./constants/theme";
import MainNavigator from "./components/layout/Navigation/MainNavigator.jsx";
import Header from "./components/layout/Header/Header.jsx";
import { Provider } from "react-redux";
import { store } from "./store/Store";
import { createContext, useState } from "react";

export const UserContext = createContext();
export default function App() {
  const [user, setUser] = useState({});

  return (
    //TODO: починить загрузку на айфон
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <UserContext.Provider value={{ user, setUser }}>
          <Header />
          <MainNavigator />
        </UserContext.Provider>
      </SafeAreaView>
    </Provider>
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
