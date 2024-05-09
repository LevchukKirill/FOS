import React, { useEffect, useState } from "react";

import { Text, View, StyleSheet } from "react-native";
import UserOrder from "./UserOrder";
import OrderService from "../../services/OrderService";

const UsersOrders = (props) => {
  const [orders, setOrders] = useState({});

  const orderService = new OrderService();
  // console.log(props.restaurantId);

  useEffect(() => {
    orderService
      .getAllOrderById("restaurant", props.restaurantId)
      .then(setOrders);
  }, []);

  return (
    <View style={styles.section}>
      {orders ? (
        Object.values(orders).map((item) => {
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
    // height: "100%",
    overflow: "hidden",
    flexDirection: "row",
    gap: 10,
    paddingVertical: 10,
  },
});

export default UsersOrders;
