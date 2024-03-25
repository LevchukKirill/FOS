import React from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants";

const OrderButton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.orderButton}>
        <Text style={{ fontSize: 18 }}>Оформить заказ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    alignItems: "center",
  },
  orderButton: {
    // paddingTop: 10,
    alignItems: "center",
    height: 50,
    justifyContent: "center",
    borderRadius: 20,
    width: "70%",
    backgroundColor: COLORS.primary,
  },
});

export default OrderButton;
