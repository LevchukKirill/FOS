import React, { useState } from "react";

import {
  Image,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
} from "react-native";
import { COLORS, SIZES } from "../../constants";

const CategoryItem = ({ cat, isActive, clickHandler }) => {
  return (
    <TouchableHighlight
      onPress={clickHandler}
      underlayColor={COLORS.primary}
      style={styles.shadow}
    >
      <View
        style={{
          backgroundColor: isActive ? COLORS.primary : COLORS.white,
          alignItems: "center",
          paddingTop: 5,
          borderRadius: SIZES.radius,
        }}
      >
        <Image source={{ uri: cat.image }} style={{ width: 75, height: 75 }} />
        <Text style={{ fontSize: SIZES.h4 }}>{cat.name}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
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
    width: 90,
    marginTop: 10,
    borderRadius: SIZES.radius,
  },
});

function fn1(clickHandler) {
  console.log({ clickHandler });
  clickHandler();
}
export default CategoryItem;
