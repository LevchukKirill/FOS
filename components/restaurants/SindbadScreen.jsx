import React, { useContext, useState } from "react";

import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import Categories from "../categories/Categories";
import OrderType from "../order/OrderType";
import Menu from "../menu/Menu";
import { UserContext } from "../../hooks/useUser";
import { SwipeEnabledContext } from "../../hooks/useNavigation";
import UsersOrders from "../admin/UsersOrder";
import UserService from "../../services/UserService";
import { COLORS } from "../../constants";
import OrdersForDelivery from "../courier/OrdersForDelivery";
import TableMenu from "../products/TableMenu";
import { BlurView } from "expo-blur";

const SindbadScreen = (props) => {
  const { setSwipeEnabled } = useContext(SwipeEnabledContext);
  const { user } = useContext(UserContext);

  // const userService = new UserService();
  const [menuShown, setMenuShown] = useState(false);

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
          <View
            style={{
              position: "absolute",
              zIndex: menuShown ? 1 : 0,
              // borderWidth: 1,
              width: "100%",
              height: "100%",
              // backgroundColor: "transparent",
              top: 0,
            }}
          >
            <BlurView
              intensity={menuShown ? 15 : 0}
              tint="light"
              experimentalBlurMethod={"dimezisBlurView"}
              blurReductionFactor={100}
              style={{
                flex: 1,
                // top: 0,
                // borderWidth: 1,
                position: "absolute",
                // backgroundColor: "transparent",
                width: "100%",
                height: "100%",
              }}
            />
            <TableMenu
              reversed={false}
              setEnabled={() => {
                setMenuShown(!menuShown);
                setSwipeEnabled(menuShown);
              }}
              enabled={menuShown}
              handler={setMenuShown}
              foods={props.foods}
            />
          </View>
          {props.type ? (
            <Categories types={props.type} />
          ) : (
            <Text style={{ width: "64%" }}>Loading...</Text>
          )}
          <OrderType />
          {/*{props.foods ? <Menu foods={props.foods} /> : <Text>Loading...</Text>}*/}
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.white,
  },
  container: {
    // borderWidth: 1,
    // backgroundColor: COLORS.white,
    height: "100%",
    // borderWidth: 1,
    // paddingHorizontal: 10,
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
    height: "100%",
    // maxHeight: "82%",
    flexBasis: "auto",
    flexGrow: 1,
    flexShrink: 1,
    overflow: "hidden",
    flexDirection: "column",
    // paddingVertical: 10,
    // marginLeft: "2%",
  },
});

export default SindbadScreen;
