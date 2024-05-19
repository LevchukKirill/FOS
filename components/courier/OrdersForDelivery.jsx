import React, { useEffect, useLayoutEffect, useState } from "react";

import { Text, View, StyleSheet } from "react-native";
import OrderService from "../../services/OrderService";
import { OrderGateway } from "../../services/OrderGateway";
import UserOrder from "../admin/UserOrder";

const OrdersForDelivery = (props) => {
  const orderGateway = new OrderGateway();
  const orderService = new OrderService();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    //join room (rest id)
    if (orderGateway.socket.connected) {
      console.log("Подключился в комнату");
      orderGateway.socket.emit("joinRoom", props.restaurantId);
    }

    function onConnect() {
      console.log("connected");
      orderGateway.socket.emit("joinRoom", props.restaurantId);
    }
    function onDisconnected() {
      console.log("disconnected");
    }
    function onChangeOrder(order) {
      console.log("change order status", order);
      setOrders((orders) => {
        const localOrder = orders.find((item) => item.id === order.id);
        if (!localOrder) {
          return [...orders, order];
        }
        Object.assign(localOrder, order);

        return orders.slice();
      });
    }

    orderGateway.socket.on("connect", onConnect);
    orderGateway.socket.on("disconnect", onDisconnected);
    orderGateway.socket.on("change:order", onChangeOrder);

    return () => {
      orderGateway.socket.off("disconnect", onDisconnected);
      orderGateway.socket.off("connect", onConnect);
      orderGateway.socket.off("ready:order", onChangeOrder);
    };
  }, []);

  useEffect(() => {
    orderService.getAllOrderForCourier(props.restaurantId).then((r) => {
      setOrders(r);
      console.log(orders);
    });
    console.log("requesting fc");
  }, []);

  return (
    <View style={styles.section}>
      {orders ? (
        orders.map((item) => {
          const date = new Date(item.updatedAt);
          // const dateString = console.log(date, dateString);
          return (
            <UserOrder
              key={item.id}
              id={item.id}
              cost={item.cost}
              status={item.status}
              time={date.toLocaleString("RU-ru")}
            />
          );
        })
      ) : (
        <View></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    // height: "100%",
    overflow: "hidden",
    flexDirection: "row",
    gap: 10,
    paddingVertical: 10,
  },
});

export default OrdersForDelivery;
