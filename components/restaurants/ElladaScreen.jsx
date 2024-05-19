import React, { useContext, useEffect, useState } from "react";

import { ScrollView, Text, View, StyleSheet, Image } from "react-native";
import { COLORS } from "../../constants";
import { UserContext } from "../../hooks/useUser";
import UsersOrders from "../admin/UsersOrder";
import OrdersForDelivery from "../courier/OrdersForDelivery";
// import Barcode from "react-barcode";
import JsBarcode from "jsbarcode";
import UserService from "../../services/UserService";
import Svg, { SvgUri, SvgXml } from "react-native-svg";

const ElladaScreen = (props) => {
  const [barcodeURL, setBarcodeURL] = useState(undefined);

  const { user } = useContext(UserContext);
  const userService = new UserService();

  useEffect(() => {
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
      <ScrollView style={styles.main}>
        {/*<Categories />*/}
        <Text>{props.transport}</Text>
        {barcodeURL ? (
          <View style={{ paddingHorizontal: 10 }}>
            <SvgXml width="100%" xml={barcodeURL} />
          </View>
        ) : (
          <Text>Loading..</Text>
        )}
        {/*</View>*/}
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
