import React, { useEffect, useState } from "react";

import { Text, View, StyleSheet, ScrollView } from "react-native";
import Categories from "../categories/Categories";
import { COLORS } from "../../constants";
import OrderType from "../order/OrderType";
import FoodService from "../../services/FoodService";
import axios from "axios";
import { CategoriesData as catData } from "../../data/CategoiresData";
import CategoryItem from "../categories/CategoryItem";
import MenuItem from "../menu/MenuItem";
import Menu from "../menu/Menu";
import { log } from "expo/build/devtools/logger";

const foodService = new FoodService();

const SindbadScreen = () => {
  const [allFood, setAllFood] = useState([]);
  const fetchData = async () => {
    return await foodService.getAllFood();
  };

  useEffect(() => {
    fetchData().then((r) => setAllFood(r));
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Categories />
        {/*{allFood.map((food) => (*/}
        {/*  <View>*/}
        {/*    /!*<Text>{Object.values(cat).join("\n")}</Text>*!/*/}
        {/*    <MenuItem food={food} />*/}
        {/*  </View>*/}
        {/*))}*/}
        {allFood ? <Menu foods={allFood} /> : <Text>no dats...</Text>}
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
