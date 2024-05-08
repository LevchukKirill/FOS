import React, { useEffect, useState } from "react";

import { Text, View, StyleSheet } from "react-native";
import UserOrder from "./UserOrder";
import OrderService from "../../services/OrderService";

const UsersOrders = () => {
  const [orders, setOrders] = useState({});

  const orderService = new OrderService();
  useEffect(() => {
    orderService.getAllOrder().then(setOrders);
  }, []);

  return (
    <View style={styles.section}>
      {orders ? (
        Object.values(orders).map((item) => (
          <UserOrder
            id={item.id}
            cost={item.cost}
            status={item.status}
            time={item.createdAt}
          />
        ))
      ) : (
        <></>
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
