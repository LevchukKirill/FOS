import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
  StatusBar,
} from "react-native";
import { COLORS } from "./constants/theme";
import MainNavigator from "./components/layout/Navigation/MainNavigator.jsx";
import Header from "./components/layout/Header/Header.jsx";
import { Provider } from "react-redux";
import { store } from "./store/Store";
import React, { useEffect, useState } from "react";
import UserService from "./services/UserService";
import { UserContext } from "./hooks/useUser";
import { usePushNotifications } from "./hooks/useNotifications";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Location from "expo-location";
import { BlurView } from "expo-blur";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function App() {
  const { expoPushToken, notification } = usePushNotifications();

  const data = JSON.stringify(notification, undefined, 2);

  const [user, setUser] = useState(undefined);
  const [blur, setBlur] = useState(true);

  const userService = new UserService();

  useEffect(() => {
    userService.auth().then(setUser);
  }, []);

  useEffect(() => {
    // console.log("user updated");
    if (!user) return;
    if (user?.role !== "COURIER") return;
    const dispose = (async () => {
      console.log(user?.role, 1);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (!status) return console.log("Нет прав");
      // console.log(status, 2);
      const watcher = await Location.watchPositionAsync(
        {},
        (currentLocation) => {
          console.log("Получил локацию", currentLocation, user.id);
          // POST /user/location
          userService.updateUserLocation(currentLocation);
          // .then((res) => console.log(res, "Курьер ", user?.id));
          // console.log(currentLocation, "Курьер ", user?.id);
        },
      );
      // console.log(9);
      return () => {
        watcher.remove();
      };
    })();
    return () => {
      dispose.then((func) => func());
    };
    // dispose().then((r) => console.log(r));
  }, [user]);

  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Test title",
      body: "Test body",
      data: { testData: "test data" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <UserContext.Provider value={{ user, setUser }}>
          <GestureHandlerRootView>
            <BottomSheetModalProvider>
              <Header />
              <MainNavigator />

              {/*<View*/}
              {/*  style={{*/}
              {/*    flex: 1,*/}
              {/*    alignItems: "center",*/}
              {/*    justifyContent: "space-around",*/}
              {/*  }}*/}
              {/*>*/}
              {/*  <Text>Your expo push token: {expoPushToken}</Text>*/}
              {/*  <View style={{ alignItems: "center", justifyContent: "center" }}>*/}
              {/*    <Text>*/}
              {/*      Notification Title:{" "}*/}
              {/*      {notification && notification.request.content.title}{" "}*/}
              {/*    </Text>*/}
              {/*    <Text>*/}
              {/*      Notification Body:{" "}*/}
              {/*      {notification && notification.request.content.body}*/}
              {/*    </Text>*/}
              {/*    <Text>*/}
              {/*      Notification Data:{" "}*/}
              {/*      {notification &&*/}
              {/*        JSON.stringify(notification.request.content.data)}*/}
              {/*    </Text>*/}
              {/*  </View>*/}
              {/*  <Button*/}
              {/*    title="Press to Send Notification"*/}
              {/*    onPress={async () => {*/}
              {/*      await sendPushNotification(expoPushToken);*/}
              {/*    }}*/}
              {/*  />*/}
              {/*</View>*/}
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </UserContext.Provider>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
    marginTop: StatusBar.currentHeight + 15,
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
});
