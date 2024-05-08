import React, { useContext } from "react";

import { Text, View, StyleSheet, ScrollView } from "react-native";
import Categories from "../categories/Categories";
import OrderType from "../order/OrderType";
import Menu from "../menu/Menu";
import { UserContext } from "../../hooks/useUser";
import UsersOrders from "../admin/UsersOrder";
import UserService from "../../services/UserService";

const SindbadScreen = (props) => {
  const { user } = useContext(UserContext);
  // const userService = new UserService();
  if (user?.role === "ADMIN")
    return (
      <ScrollView>
        <Text> Вы важный тип</Text>
        <View style={styles.container}>
          <UsersOrders />
        </View>
      </ScrollView>
    );
  // userService.auth();
  // if (user?.role === "USER")
  else
    return (
      <View style={styles.container}>
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
  container: {
    height: "100%",
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    overflow: "hidden",
  },
  section: {
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
