import React, { useState } from "react";

import { Text, View, StyleSheet, Pressable } from "react-native";
import { COLORS } from "../../constants";
import AddFoodButton from "./AddFoodButton";

const MenuButton = (props) => {
  const [count, setCount] = useState(0);
  return (
    <View style={styles.box}>
      <AddFoodButton
        clickHandler={() => setCount((prevState) => prevState + 1)}
        count={count}
        name={"+"}
        plus={true}
      />
      <View style={styles.countText}>
        <Text>{count}</Text>
      </View>
      {count === 0 ? (
        <></>
      ) : (
        <AddFoodButton
          clickHandler={() => setCount((prevState) => prevState - 1)}
          count={count}
          name={"--"}
          plus={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    // height: "10%",
    // borderWidth: 1,
    // borderRadius: 10,
  },
  buttonInc: {
    backgroundColor: COLORS.green,
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
    flexGrow: 1,
    // borderWidth: 1,
    alignItems: "center",
  },
});
export default MenuButton;
