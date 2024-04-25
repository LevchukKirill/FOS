import React, { useState } from "react";

import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants";

const Payment = ({ handler }) => {
  const [visible, setVisible] = useState(false);
  const timer = () => {
    setVisible(!visible);
    setTimeout(handler, 1000);
  };
  return (
    <View style={styles.modalBox}>
      <Text>Оплата за заказ: {"{сумма заказа}"}</Text>
      <TouchableOpacity onPress={timer}>
        <View style={styles.button}>
          <Text>Оплатить</Text>
        </View>
      </TouchableOpacity>
      <Text>{visible ? "Происходит оплата. Подождите.." : ""}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBox: {
    backgroundColor: COLORS.white,
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  button: {
    borderRadius: 10,
    padding: 5,
    backgroundColor: COLORS.primary,
  },
});
export default Payment;
