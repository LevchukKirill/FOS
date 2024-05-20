import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants";
import Payment from "../payment/Payment";
// import CircleLoad from "../../ui/loading/CircleLoad";

const OrderButton = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
        style={styles.orderButton}
      >
        <Text style={{ fontSize: 18 }}>Оформить заказ</Text>
      </TouchableOpacity>
      <Modal
        presentationStyle={"pageSheet"}
        animationType={"slide"}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ paddingTop: 60 }}>
          <Payment
            handler={() => {
              setModalVisible(false);
            }}
          />
        </View>
      </Modal>
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
