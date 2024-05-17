import React, { useState } from "react";

import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants";
import OrderService from "../../services/OrderService";
import ModalOrder from "./ModalOrder";

const UserOrder = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [orderInfo, setOrderInfo] = useState({});

  const orderService = new OrderService();

  return (
    <TouchableOpacity
      onPress={() => {
        setModalVisible(true);
        orderService.getOneOrder(props.id).then(setOrderInfo);
      }}
      style={styles.orderBox}
    >
      <ModalOrder
        orderId={props.id}
        info={orderInfo}
        visible={modalVisible}
        handler={() => setModalVisible(!modalVisible)}
      />
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
