import {
  Text,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import Auth from "../Auth/Auth.jsx";
import React, { useContext } from "react";
import UserService from "../../../services/UserService";
import { UserContext } from "../../../hooks/useUser";
import { gStyle } from "../../../styles/style.js";
import UserCard from "../UserCard/UserCard";
import FoodService from "../../../services/FoodService";

const userService = new UserService();
const foodService = new FoodService();

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <View style={styles.header}>
      <View>
        <Pressable
          style={gStyle.button}
          onPress={async () => {
            console.log(await foodService.getAllFood());
          }}
        >
          <Text style={gStyle.textBtn}> </Text>
        </Pressable>
      </View>
      <View>{user ? <UserCard /> : <Auth />}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 10,
    paddingBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  }
});

export default Header;
