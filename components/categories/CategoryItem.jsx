import React, { useEffect, useState } from "react";

import {
  Image,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES } from "../../constants";

const CategoryItem = ({ type, isActive, clickHandler }) => {
  const [idx, setIdx] = useState("");

  const images = [
    require("../../assets/pizza2.png"),
    require("../../assets/chicken.png"),
    require("../../assets/burger.png"),
    require("../../assets/soup.png"),
    require("../../assets/salad.png"),
    require("../../assets/pancake.png"),
    require("../../assets/cola.png"),
    require("../../assets/cake.png"),
  ];

  useEffect(() => {
    setIdx(images[type.id - 1]);
  }, []);

  return (
    <View>
      <TouchableOpacity
        // underlayColor={COLORS.primary}
        onPress={clickHandler}
        style={[styles.shadow, { height: 96, width: 90 }]}
      >
        <View
          style={{
            // borderWidth: 1,
            backgroundColor: isActive ? "#ff8800" : COLORS.white,
            alignItems: "center",
            paddingTop: 5,
            height: "100%",
            maxWidth: "100%",
            display: "flex",
            // flexDirection: "column",
            borderRadius: SIZES.radius,

            // elevation: 2,
            // borderWidth: 1,
            justifyContent: "space-around",
          }}
        >
          {idx ? (
            <Image
              source={idx}
              style={{
                // width: "100%",
                aspectRatio: "1/1",
                height: "55%",
                objectFit: "scale-down",
                // borderWidth: 1,
              }}
            />
          ) : (
            <></>
          )}
          <Text style={{ fontSize: SIZES.h4, padding: 0 }}>{type.name}</Text>
        </View>
      </TouchableOpacity>
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
    // borderWidth: 1,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,

    borderRadius: SIZES.radius,
  },
  catItem: {
    // maxWidth: "50%",
    // aspectRatio: "1 / 1", // marginTop: 10,
    // borderRadius: SIZES.radius,
  },
});

export default CategoryItem;
