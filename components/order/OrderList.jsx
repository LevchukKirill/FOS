import React from "react";
import OrderItem from "./OrderItem";

import { Text, View, StyleSheet } from "react-native";
import { COLORS } from "../../constants";
import { useSelector } from "react-redux";

const OrderList = () => {
  const { basket } = useSelector((state) => state);
  return (
    <View style={{ paddingTop: 30 }}>
      <View style={styles.container}>
        {Object.values(basket).map(({ data: food, amount }) => (
          <OrderItem food={food} amount={amount} />
        ))}
      </View>
      <View style={styles.orderText}>
        <Text style={{ fontSize: 18 }}>{"{кол} товара на {сумма}"}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  orderText: {
    position: "absolute",
    top: 2,
    left: -2,
  },
  container: {
    width: "100%",
    backgroundColor: COLORS.lightGray1,
    // borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    flexDirection: "column",
    rowGap: 15,
  },
});

export default OrderList;
