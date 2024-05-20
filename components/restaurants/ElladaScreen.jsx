import React, { useContext, useEffect, useState } from "react";

import { ScrollView, Text, View, StyleSheet, Image } from "react-native";
import { COLORS } from "../../constants";
import { UserContext } from "../../hooks/useUser";
import UsersOrders from "../admin/UsersOrder";
import OrdersForDelivery from "../courier/OrdersForDelivery";
// import Barcode from "react-barcode";
import JsBarcode from "jsbarcode";
import UserService from "../../services/UserService";
import TableMenu from "../products/TableMenu";
import Svg, { SvgUri, SvgXml } from "react-native-svg";
import Categories from "../categories/Categories";
import OrderType from "../order/OrderType";

const ElladaScreen = (props) => {
  const [barcodeURL, setBarcodeURL] = useState(undefined);
  const [menuShown, setMenuShown] = useState(false);

  const { user } = useContext(UserContext);
  const userService = new UserService();

  useEffect((props) => {
    (async () => {
      const url = await userService.getBarcode();
      setBarcodeURL(url);
      // console.log(url);
    })();
  }, []);

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
      <View style={[styles.container, styles.main]}>
        <View style={styles.section}>
          {props.type ? (
            <Categories types={props.type} />
          ) : (
            <Text style={{ width: "64%" }}>Loading...</Text>
          )}
          <OrderType />
          <View
            style={{
              position: "absolute",
              // borderWidth: 1,
              width: "100%",
              height: "100%",
              bottom: 0,
            }}
          >
            <TableMenu
              reversed={true}
              enabled={menuShown}
              handler={setMenuShown}
            />
          </View>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.white,
  },
  container: {
    height: "100%",
    // paddingHorizontal: 10,
    display: "flex",
    flexDirection: "column",
    // columnGap: 50,
    // rowGap: 50,
    overflow: "hidden",
  },
  section: {
    // borderWidth: 1,
    display: "flex",
    flexWrap: "wrap-reverse",
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
    // marginRight: "2%",
  },
});

export default ElladaScreen;
