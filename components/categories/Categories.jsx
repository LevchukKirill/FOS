import React, { useContext, useState } from "react";
import { Text, Image, View, StyleSheet, ScrollView } from "react-native";
import { CategoriesData as catData } from "../../data/CategoiresData";
import { COLORS, SIZES } from "../../constants/theme";
import CategoryItem from "./CategoryItem";
import {
  ActiveContext,
  TypesContext,
} from "../layout/Navigation/RestaurantsNav";

const Categories = ({ type }) => {
  // const [types, setTypes] = useContext(Context);
  const [activeType, setActiveType] = useContext(ActiveContext);
  const types = useContext(TypesContext);

  return (
    <ScrollView style={styles.main}>
      <View style={styles.container}>
        {types.map((type) => (
          <View style={styles.catItem} key={type.id}>
            <CategoryItem
              type={type}
              isActive={activeType?.id === type.id}
              clickHandler={() => setActiveType(types[type.id - 1])}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    // borderWidth: 1,
    display: "flex",
    maxWidth: "64%",
    width: "auto",
    height: "100%",
    // paddingTop: 10,
    // marginVertical: 10,
  },
  container: {
    display: "flex",
    height: "100%",
    borderRadius: 20,
    backgroundColor: COLORS.lightGray1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    padding: 10,
    alignItems: "stretch",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

    borderRadius: SIZES.radius,
  },
  catItem: {
    // borderWidth: 1,

    // display: "flex",

    // minWidth: "25%",
    // padding: 5,

    maxWidth: "50%",
    borderRadius: SIZES.radius,
  },
});

export default Categories;
