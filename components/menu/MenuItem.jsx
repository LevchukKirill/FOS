import React from "react";

import { Text, View, StyleSheet } from "react-native";
// import FoodCounter from "../order/FoodCounter";
import MenuButton from "./MenuButton";

const MenuItem = ({ food }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text>{food.name}</Text>
        <Text>{food.price}</Text>
      </View>
      <MenuButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    // justifyContent: "center",
    // alignContent: "center",
    width: "100%",
    // height: ,
    // borderWidth: 1,
    marginBottom: 5,
    // borderWidth: 1,
    paddingHorizontal: 20,
  },
});

export default MenuItem;
