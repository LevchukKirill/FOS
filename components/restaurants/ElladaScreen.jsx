import React, { useContext, useEffect, useState } from "react";

import { ScrollView, Text, View, StyleSheet, Image } from "react-native";
import { COLORS } from "../../constants";
import { UserContext } from "../../hooks/useUser";
import UsersOrders from "../admin/UsersOrder";
import OrdersForDelivery from "../courier/OrdersForDelivery";
import TableMenu from "../products/TableMenu";
import Svg, { SvgUri, SvgXml } from "react-native-svg";
import Categories from "../categories/Categories";
import OrderType from "../order/OrderType";
import { ActiveRestaurantContext } from "../../hooks/useActiveRestaurant";
import { SwipeEnabledContext } from "../../hooks/useNavigation";
import { BlurView } from "expo-blur";
import { useFocusEffect } from "@react-navigation/native";

const ElladaScreen = (props) => {
  const { setSwipeEnabled } = useContext(SwipeEnabledContext);
  const { user } = useContext(UserContext);
  const [activeRestaurant, setActiveRestaurant] = useContext(
    ActiveRestaurantContext,
  );
  const [menuShown, setMenuShown] = useState(false);

  useFocusEffect(() => {
    setActiveRestaurant(props.restaurant);
    // console.log(props.foods);
  });

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
  else
    return (
      <View style={[styles.container, styles.main]}>
        <View style={styles.section}>
          {props.foods?.length ? (
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
                reversed={true}
                setEnabled={() => {
                  setMenuShown(!menuShown);
                  setSwipeEnabled(menuShown);
                }}
                category={props.activeType}
                enabled={menuShown}
                handler={setMenuShown}
                foods={props.foods}
              />
            </View>
          ) : (
            <Text>Loading...</Text>
          )}

          {props.type ? (
            <Categories types={props.type} />
          ) : (
            <Text style={{ width: "64%" }}>Loading...</Text>
          )}
          <OrderType userAddress={user?.address} restAddress={props?.address} />
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
