import React, { useContext, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { COLORS, SIZES } from "../../constants/theme";
import CategoryItem from "./CategoryItem";
import { TypeContext } from "../../hooks/useCategories";
import { ActiveTypeContext } from "../../hooks/useActiveType";

const Categories = ({ type }) => {
  const [activeType, setActiveType] = useContext(ActiveTypeContext);
  const [types, setTypes] = useContext(TypeContext);

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
    // borderWidth: 1,
    display: "flex",
    height: "100%",
    borderRadius: 20,
    //backgroundColor: COLORS.lightGray1,
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
    padding: 2,

    maxWidth: "50%",
    borderRadius: SIZES.radius,
  },
});

export default Categories;
