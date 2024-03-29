import React from "react";

import { Text, View, StyleSheet } from "react-native";
import FoodCounter from "../order/FoodCounter";

const MenuItem = ({ food }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text>{food.name}</Text>
        <Text>{food.id}</Text>
      </View>
      <FoodCounter />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    // justifyContent: "center",
    // alignContent: "center",
    width: "100%",
    // borderWidth: 1,
    marginBottom: 5,
    paddingHorizontal: 20,
  },
});

export default MenuItem;
