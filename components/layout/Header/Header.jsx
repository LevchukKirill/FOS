import {
  Button,
  Linking,
  Text,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import Auth from "../Auth/Auth.jsx";
import React from "react";
import { COLORS } from "../../../constants";

const Header = () => {
  return (
    <View style={styles.header}>
      <View>
        <Pressable
          style={styles.authBtn}
          onPress={() => Linking.openURL("https://google.com")}
        >
          <Text>Binus</Text>
        </Pressable>
      </View>

      <View>
        <Auth />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  authBtn: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: COLORS.primary,
  },
});

export default Header;
