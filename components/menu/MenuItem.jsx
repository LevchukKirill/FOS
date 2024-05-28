import React from "react";

import { View, StyleSheet } from "react-native";

import MenuImage from "./MenuImage";
import MenuInfo from "./MenuInfo";

const MenuItem = ({ isReversed, food, isActive, isEnabled }) => {
  return (
    <View
      style={
        !isReversed
          ? isEnabled
            ? isActive
              ? styles.activeContainer
              : styles.container
            : styles.disabledContainer
          : isEnabled
            ? isActive
              ? styles.revActiveContainer
              : styles.revContainer
            : isActive
              ? styles.revActiveEnabledContainer
              : styles.revDisabledContainer
      }
    >
      {!isReversed ? (
        <View style={{ width: "100%", flexDirection: "row" }}>
          <MenuImage food={food} />
          {isActive ? <MenuInfo food={food} /> : <></>}
        </View>
      ) : (
        <View style={{ width: "100%", flexDirection: "row" }}>
          {isActive ? <MenuInfo food={food} /> : <></>}
          <MenuImage food={food} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width: "100%",
    height: "180%",
    flexDirection: "row",
    display: "flex",
  },
  activeContainer: {
    justifyContent: "space-between",
    width: "100%",
    height: "180%",
    flexDirection: "row",
  },
  disabledContainer: {
    justifyContent: "space-between",
    width: "100%",
    height: "130%",
    flexDirection: "row",
  },

  revContainer: {
    justifyContent: "center",
    width: "100%",
    height: "180%",
    flexDirection: "row",
    display: "flex",
    // marginLeft: 200,
  },
  revActiveContainer: {
    justifyContent: "space-between",
    width: "100%",
    height: "180%",
    marginRight: 200,

    flexDirection: "row",
  },
  revActiveEnabledContainer: {
    justifyContent: "space-between",
    width: "100%",
    height: "130%",
    marginRight: 235,

    flexDirection: "row",
  },
  revDisabledContainer: {
    // borderWidth: 1,
    justifyContent: "space-between",
    width: "100%",
    height: "130%",
    flexDirection: "row",
    marginLeft: 0,
  },
});

export default MenuItem;
