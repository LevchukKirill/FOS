import React from "react";

import { Text, View } from "react-native";
import Categories from "../categories/Categories";
import { COLORS } from "../../constants";
import OrderType from "../order/OrderType";

const SindbadScreen = () => {
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <Categories />
      <OrderType />
    </View>
  );
};

export default SindbadScreen;
