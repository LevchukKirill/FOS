import React, { useEffect, useLayoutEffect, useState } from "react";

import { Text, View, StyleSheet } from "react-native";
import UserOrder from "./UserOrder";
import OrderService from "../../services/OrderService";
import { OrderGateway } from "../../services/OrderGateway";

const UsersOrders = (props) => {
  const orderGateway = new OrderGateway();

  const [orders, setOrders] = useState([]);

  const orderService = new OrderService();

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
    function onPaidOrder(order) {
      console.log("new order", order, orders.length);
      setOrders((orders) => [...orders, order]);
    }

    function onChangeOrder(order) {
      console.log("change order status", order);
      setOrders((orders) => {
        const localOrder = orders.find((item) => item.id === order.id);
        if (!localOrder) {
          return [...orders, localOrder];
        }
        Object.assign(localOrder, order);

        return orders.slice();
      });
    }
    orderGateway.socket.on("connect", onConnect);
    orderGateway.socket.on("disconnect", onDisconnected);
    orderGateway.socket.on("change:order", onChangeOrder);
    orderGateway.socket.on("paid:order", onPaidOrder);

    return () => {
      orderGateway.socket.off("disconnect", onDisconnected);
      orderGateway.socket.off("connect", onConnect);
      orderGateway.socket.off("paid:order", onPaidOrder);
    };
  }, []);

  useEffect(() => {
    orderService.getAllOrderById("restaurant", props.restaurantId).then((r) => {
      // console.log(r);
      setOrders(r);
    });
    console.log("requesting");
  }, []);

  return (
    <View style={styles.section}>
      {orders ? (
        orders.map((item) => {
          const date = new Date(item.createdAt);
          // const dateString =
          // console.log(date, dateString);
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
    paddingHorizontal: 10,
    // height: "100%",
    overflow: "hidden",
    flexDirection: "row",
    gap: 10,
    paddingVertical: 10,
  },
});

export default UsersOrders;
