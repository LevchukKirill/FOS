import React from "react";

import { ScrollView, Text, View } from "react-native";
import Categories from "../categories/Categories";
import { COLORS } from "../../constants";

const ElladaScreen = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.black }}>
      <Categories />
      <Categories />
    </ScrollView>
  );
};

export default ElladaScreen;
