import React, { useContext } from "react";

import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import Categories from "../categories/Categories";
import OrderType from "../order/OrderType";
import Menu from "../menu/Menu";
import { UserContext } from "../../hooks/useUser";
import UsersOrders from "../admin/UsersOrder";
import UserService from "../../services/UserService";
import { COLORS } from "../../constants";
import OrdersForDelivery from "../courier/OrdersForDelivery";

const SindbadScreen = (props) => {
  const { user } = useContext(UserContext);
  // const userService = new UserService();
  // console.log(props);
  if (user?.role === "ADMIN")
    return (
      <ScrollView style={styles.main}>
        <Text> Вы важный тип 1</Text>
        <View style={styles.container}>
          <UsersOrders restaurantId={props.restaurantId} />
        </View>
      </ScrollView>
    );
  // userService.auth();
  // if (user?.role === "USER")
  if (user?.role === "COURIER")
    return (
      <ScrollView style={styles.main}>
        <Text> Вы доставщик</Text>
        <View style={styles.container}>
          <OrdersForDelivery restaurantId={props.restaurantId} />
        </View>
      </ScrollView>
    );
  else
    return (
      <View style={[styles.container, styles.main]}>
        <View style={styles.section}>
          {props.type ? (
            <Categories types={props.type} />
          ) : (
            <Text style={{ width: "64%" }}>Loading...</Text>
          )}
          {props.foods ? <Menu foods={props.foods} /> : <Text>Loading...</Text>}
        </View>
        <OrderType />
      </View>
    );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.white,
  },
  container: {
    // backgroundColor: COLORS.white,
    height: "100%",
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    overflow: "hidden",
  },
  section: {
    // borderWidth: 1,
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxHeight: "82%",
    flexBasis: "auto",
    flexGrow: 1,
    flexShrink: 1,
    overflow: "hidden",
    flexDirection: "row",
    paddingVertical: 10,
  },
});

export default SindbadScreen;
