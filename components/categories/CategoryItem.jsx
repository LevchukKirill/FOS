import React, { useState } from "react";

import {
  Image,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import { COLORS, SIZES } from "../../constants";

const CategoryItem = ({ type, isActive, clickHandler }) => {
  return (
    <View style={styles.container}>
      <Pressable
        // underlayColor={COLORS.primary}
        onPress={clickHandler}
        style={
          (styles.shadow,
          { height: 100, width: 100, borderRadius: SIZES.radius })
        }
      >
        <View
          style={{
            // borderWidth: 1,
            backgroundColor: isActive ? COLORS.primary : COLORS.white,
            alignItems: "center",
            paddingTop: 5,
            height: "100%",
            // maxWidth: "70%",
            display: "flex",
            flexDirection: "column",
            borderRadius: SIZES.radius,
          }}
        >
          {/*<Image*/}
          {/*  source={{ uri: cat.image }}*/}
          {/*  style={{*/}
          {/*    display: "flex",*/}
          {/*    padding: 10,*/}
          {/*    width: "100%",*/}
          {/*    flexBasis: "auto",*/}
          {/*    flexGrow: 1,*/}
          {/*    flexShrink: 1,*/}
          {/*    maxHeight: "100%",*/}
          {/*    objectFit: "contain",*/}
          {/*  }}*/}
          {/*/>*/}

          <Text style={{ fontSize: SIZES.h4 }}>{type.name}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: { borderWidth: 1 },
  // container: {
  //   borderWidth: 1,
  //   alignItems: "center",
  //   paddingTop: 5,
  //   height: "100%",
  //   maxWidth: "70%",
  // display: "flex",
  // flexDirection: "column",
  // borderRadius: SIZES.radius,
  // },
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
    // maxWidth: "50%",
    // aspectRatio: "1 / 1", // marginTop: 10,
    // borderRadius: SIZES.radius,
  },
});

export default CategoryItem;
