import React from "react";

import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants";
const UserOrder = (props) => {
  return (
    <TouchableOpacity style={styles.orderBox}>
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
