import React, { useContext } from "react";

import { ScrollView, Text, View, StyleSheet } from "react-native";
import { COLORS } from "../../constants";
import { UserContext } from "../../hooks/useUser";
import UsersOrders from "../admin/UsersOrder";
import OrdersForDelivery from "../courier/OrdersForDelivery";

const ElladaScreen = (props) => {
  const { user } = useContext(UserContext);
  // const userService = new UserService();
  // console.log(props);
  if (user?.role === "ADMIN")
    return (
      <ScrollView style={styles.main}>
        <Text> Вы важный тип</Text>
        <View style={styles.container}>
          <UsersOrders restaurantId={props.restaurantId} />
        </View>
      </ScrollView>
    );
  if (user?.role === "COURIER")
    return (
      <ScrollView style={styles.main}>
        <Text> Вы доставщик</Text>
        <View style={styles.container}>
          <OrdersForDelivery restaurantId={props.restaurantId} />
        </View>
      </ScrollView>
    );
  // userService.auth();
  // if (user?.role === "USER")
  else
    return (
      <ScrollView style={styles.main}>
        {/*<Categories />*/}
        <Text>{props.transport}</Text>
        <Text>
          {props.connected ? "Ура че то конектед" : "Балин ниче не конектед"}
        </Text>
        {/*<Categories />*/}
      </ScrollView>
    );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.white,
  },
  container: {
    height: "100%",
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    overflow: "hidden",
  },
});

export default ElladaScreen;
