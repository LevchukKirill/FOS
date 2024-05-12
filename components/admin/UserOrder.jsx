import React from "react";

import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants";
import OrderService from "../../services/OrderService";

const UserOrder = (props) => {
  const orderService = new OrderService();

  return (
    <TouchableOpacity
      onPress={() => {
        orderService.getOneOrder(props.id);
      }}
      style={styles.orderBox}
    >
      <Text>{props.id}</Text>
      <Text>{props.cost}</Text>
      <Text>{props.time}</Text>
      <Text>{props.status}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  orderBox: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 8,
    backgroundColor: COLORS.green,
  },
});

export default UserOrder;
