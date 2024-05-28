import { Text, View, StyleSheet, Pressable } from "react-native";
import Auth from "../Auth/Auth.jsx";
import React, { useContext } from "react";
import UserService from "../../../services/UserService";
import { UserContext } from "../../../hooks/useUser";
import { gStyle } from "../../../styles/style.js";
import UserCard from "../UserCard/UserCard";
import FoodService from "../../../services/FoodService";
import ModalSheet from "../Auth/BottomSheet";

const userService = new UserService();
const foodService = new FoodService();

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <View style={styles.header}>
      <View>
        <ModalBonus />
      </View>
      !user ? (
      <View>
        <ModalAuth />
      </View>
      ) : (
      <View>
        <UserCard />
      </View>
      )
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 10,
    // paddingBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    // borderWidth: 1,
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
