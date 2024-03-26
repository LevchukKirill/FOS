import React from "react";

import { Text, View, StyleSheet } from "react-native";
import Categories from "../categories/Categories";
import { COLORS } from "../../constants";
import OrderType from "../order/OrderType";

const SindbadScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Categories />
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
    fontSize: 10,
    // marginHorizontal: 10,
  },
  section: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxHeight: "80%",
    flexBasis: "auto",
    flexGrow: 1,
    flexShrink: 1,
    overflow: "hidden",
    // borderWidth: 1,
    // paddingBottom: 10,
  },
});

export default SindbadScreen;
