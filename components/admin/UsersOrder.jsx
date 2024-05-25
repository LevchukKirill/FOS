import React, { useEffect, useLayoutEffect, useState } from "react";

import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import UserOrder from "./UserOrder";
import OrderService from "../../services/OrderService";
import { OrderGateway } from "../../services/OrderGateway";
import { gStyle } from "../../styles/style";

const UsersOrders = (props) => {
  const orderGateway = new OrderGateway();

  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState(undefined);
  const [activeButton, setActiveButton] = useState(undefined);

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

  function onChangeButton(id, status) {
    if (id === activeButton) {
      setActiveButton(undefined);
      setFilter(undefined);
      console.log(id, activeButton);
      return;
    }
    setFilter(status);
    setActiveButton(id);
    return;
  }

  return (
    <View style={styles.section}>
      <View
        style={{
          flexDirection: "row",
          flexGrow: 1,
          padding: 5,
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity onPress={() => onChangeButton(1, "PAID")}>
          <View
            style={[
              gStyle.button,
              {
                backgroundColor:
                  activeButton === 1
                    ? "rgba(255, 140, 0, 1)"
                    : "rgba(255, 140, 0, 0.3)",
              },
            ]}
          >
            <Text>Оплачено</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onChangeButton(2, "COOKING")}>
          <View
            style={[
              gStyle.button,
              {
                backgroundColor:
                  activeButton === 2
                    ? "rgba(255, 140, 0, 1)"
                    : "rgba(255, 140, 0, 0.3)",
              },
            ]}
          >
            <Text>Готовятся</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onChangeButton(3, "READY")}>
          <View
            style={[
              gStyle.button,
              {
                backgroundColor:
                  activeButton === 3
                    ? "rgba(255, 140, 0, 1)"
                    : "rgba(255, 140, 0, 0.3)",
              },
            ]}
          >
            <Text>Готовы</Text>
          </View>
        </TouchableOpacity>
      </View>
      {orders ? (
        orders
          .filter((item) => {
            if (!filter) return true;
            return item.status === filter;
          })
          .map((item) => {
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
