import React, { useState } from "react";

import { Text, View, StyleSheet, Pressable } from "react-native";
import { COLORS } from "../../constants";
import AddFoodButton from "./AddFoodButton";

const MenuButton = ({ count, inc, dec }) => {
  return (
    <View style={styles.box}>
      <AddFoodButton
        clickHandler={inc}
        count={count}
        name={!count ? "Выбрать" : "+"}
        plus={true}
      />
      {count === 0 ? (
        <></>
      ) : (
        // <View style={{ flexDirection: "row", width: "67%" }}>
        <View style={styles.countText}>
          <View
            style={{
              minWidth: "30%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>{count}</Text>
          </View>
          <AddFoodButton
            clickHandler={dec}
            count={count}
            name={"-"}
            plus={false}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    // borderWidth: 1,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    // height: "20%",
    minHeight: "20%",
    maxHeight: "40%",
    // height: "100%",
    // justifyContent: "space-between",
    // width: 90,
    // margin: "auto",
    // height: ,
    // borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  buttonInc: {
    backgroundColor: COLORS.primary,
    width: "100%",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    alignItems: "center",
  },
  buttonDec: {
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    backgroundColor: COLORS.lightOrange,
    width: "100%",
    alignItems: "center",
  },
  countText: {
    // display: "flex",
    height: "100%",
    // width: "100%",
    flexGrow: 1,
    flexShrink: 1,
    // justifyContent: "space-between",
    flexDirection: "row",
    // flexGrow: 1,
    // borderWidth: 1,
    // alignItems: "center",
  },
});
export default MenuButton;
