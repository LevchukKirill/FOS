import React from "react";

import { Text, View, StyleSheet, Image } from "react-native";
import FoodCounter from "./FoodCounter";

const OrderItem = () => {
  return (
    <View style={styles.container}>
      <FoodCounter name={"Я картинка"} />
      <View style={styles.productText}>
        <Text>{"{название товара}"}</Text>
        <Text>{"{описание товара}"}</Text>
      </View>
      <FoodCounter name={"Я счетчик"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    columnGap: 10,
    // borderWidth: 1,
  },
  productText: {
    flex: 1,
    borderWidth: 1,
  },
});

export default OrderItem;
