import React, { useContext, useEffect, useState } from "react";

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { COLORS } from "../../constants";
import { useSelector } from "react-redux";
import OrderFoodService from "../../services/OrderFoodService";
import OrderService from "../../services/OrderService";
import { useActions } from "../../hooks/useActions";
import { MaterialIcons } from "@expo/vector-icons";
import { gStyle } from "../../styles/style";
import { WebView } from "react-native-webview";

const Payment = ({ handler }) => {
  const [visible, setVisible] = useState(false);
  const [payStatus, setPayStatus] = useState(undefined);
  const [notificationText, setNotificationText] = useState("");
  const [status, setStatus] = useState("CREATED");

  const paymentStatus = true;

  const basket = useSelector((state) => state.basket);
  const { clearBasket } = useActions();

  const orderFoodService = new OrderFoodService();
  const orderService = new OrderService();

  const changeStatus = async (id, status) => {
    setStatus(status);
    await orderService.updateOrder(id, status);
    console.log("вы поменяли статус");
  };

  const payment = async () => {
    const order = await orderService.createOrder(basket);
    if (!paymentStatus) {
      setPayStatus(false);
      await changeStatus(order.id, { status: "NOT_PAID" });
      setVisible(!visible);
      setTimeout(() => setNotificationText("Оплата не прошла"), 1000);
      setTimeout(handler, 2000);
    } else {
      setPayStatus(true);
      // console.log(order.id);
      // await changeStatus(order.id, "PAID");
      // await orderService.updateOrder(order.id, { status: "PAID" });
      await orderService.pay(order.id, true);

      // console.log(order.id);
      clearBasket();
      setVisible(!visible);
      setTimeout(() => setNotificationText("Оплата прошла успешно"), 1000);

      setTimeout(handler, 2000);
    }
  };

  return (
    <View style={styles.modalBox}>
      <MaterialIcons name="keyboard-arrow-down" size={30} color="black" />
      <Text>Оплата за заказ: {"{сумма заказа}"}</Text>
      {/*<Button onPress={payment}>*/}
      {/*<View style={styles.button}>*/}
      <View style={{ width: "100%", height: "100%" }}>
        <WebView
          source={{ uri: "http://176.57.208.33:5000/tinkoffPayment.html" }}
          // onLoad={(event) => {
          //   console.log(event);
          // }}
          // style={{ width: "90%", borderWidth: 100 }}
          // onError={(event) => console.log(event)}
          // originWhitelist={["*"]}
          // source={{ html: "<h1>Hello world</h1>" }}
        />
      </View>
      {/*</View>*/}
      {/*</Button>*/}
      <Text>{visible ? "Происходит оплата. Подождите.." : ""}</Text>
      <Text>{notificationText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBox: {
    backgroundColor: COLORS.white,
    alignItems: "center",
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowRadius: 8,
    shadowColor: "gray",
    shadowOpacity: 0.3,

    //backgroundColor: "black",
  },
  button: {
    // marginTop: "175%",
    // borderRadius: 10,
    // padding: 5,
    // width: "100%",
    // borderWidth: 1,
    // backgroundColor: COLORS.primary,
  },
});
export default Payment;
