import {
  Button,
  Linking,
  Text,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import Auth from "../Auth/Auth.jsx";
import React, { useContext } from "react";
import { COLORS } from "../../../constants";
import UserService from "../../../services/UserService";
import { UserContext } from "../../../hooks/useUser";
import { gStyle } from "../../../styles/style.js";

// import { FontAwesome5 } from '@expo/vector-icons';

const userService = new UserService();

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <View style={styles.header}>
      <View>
        <Pressable
          style={gStyle.button}
         
          onPress={async () => {
            console.log(await userService.auth());
          }}
        >
          <Text style={gStyle.textBtn}> 70 Б </Text>
          {/* <FontAwesome5 name="coins" size={15} color="black" /> */}
        </Pressable>
      </View>

      <View>{user ? null : <Auth />}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 10,
    paddingBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // authBtn: {
  //   paddingVertical: 4,
  //   paddingHorizontal: 12,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderRadius: 30,
  //   backgroundColor: COLORS.primary,
  // },
});

export default Header;
