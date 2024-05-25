import React, { useContext, useEffect } from "react";

import { ScrollView, Text, View, StyleSheet } from "react-native";
import { COLORS } from "../../constants";
import { UserContext } from "../../hooks/useUser";
import UsersOrders from "../admin/UsersOrder";
import OrdersForDelivery from "../courier/OrdersForDelivery";
import { ActiveRestaurantContext } from "../../hooks/useActiveRestaurant";
import { useFocusEffect } from "@react-navigation/native";

const ShtolenhofScreen = (props) => {
  const [activeRestaurant, setActiveRestaurant] = useContext(
    ActiveRestaurantContext,
  );
  const { user } = useContext(UserContext);
  // console.log(props?.restaurantId);

  useFocusEffect(() => {
    // setActiveRestaurant(props?.restaurantId);
    // console.log(props?.restaurantId);
  });
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

export default ShtolenhofScreen;
