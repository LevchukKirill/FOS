import React from "react";

import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants";

const CurrentOrderItem = ({ order }) => {
  return (
    <TouchableOpacity>
      <View style={styles.orderInfo}>
        <Text>{`Заказ номер ${order?.id}`}</Text>
        <Text>{`Стоимость ${order?.cost} руб.`}</Text>
        <Text>{`Время заказа ${order?.createdAt}`}</Text>
        <Text>{`Статус заказа ${order?.status}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  orderInfo: {
    width: "100%",
    padding: 10,
    borderRadius: 20,
    backgroundColor: COLORS.white,
  },
});

export default CurrentOrderItem;
