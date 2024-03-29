import React, { useEffect, useState } from "react";

import { Text, View, StyleSheet, ScrollView } from "react-native";
import Categories from "../categories/Categories";
import OrderType from "../order/OrderType";
import FoodService from "../../services/FoodService";
import TypeService from "../../services/TypeService";
import Menu from "../menu/Menu";

const SindbadScreen = (props) => {
  // const fetchData = async () => {
  //   return await foodService.getAllFood();
  // };
  //
  // useEffect(() => {
  //   fetchData().then((r) => setAllFood(r));
  // }, []);
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
    // borderWidth: 1,
    height: "100%",
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    overflow: "hidden",
    fontSize: 10,
    // marginHorizontal: 10,
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
    // borderWidth: 1,
    // paddingBottom: 10,
  },
});

export default SindbadScreen;
