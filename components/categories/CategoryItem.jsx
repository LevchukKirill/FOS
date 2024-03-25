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
    <View style={styles.container}>
      <TouchableHighlight
        underlayColor={COLORS.primary}
        onPress={clickHandler}
        style={
          (styles.shadow,
          { height: 100, width: 100, borderRadius: SIZES.radius })
        }
      >
        <View
          style={{
            backgroundColor: isActive ? COLORS.primary : COLORS.white,
            alignItems: "center",
            paddingTop: 5,
            height: 100,
            width: 100,
            borderRadius: SIZES.radius,
          }}
        >
          <Image
            source={{ uri: cat.image }}
            style={{ width: 75, height: 75 }}
          />
          <Text style={{ fontSize: SIZES.h4 }}>{cat.name}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 0, padding: 0, paddingTop: 0 },
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
    // marginTop: 10,
    borderRadius: SIZES.radius,
  },
});

export default CategoryItem;
