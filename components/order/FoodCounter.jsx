import React, { useState } from "react";

import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants";

const FoodCounter = (props) => {
  const [count, setCount] = useState(1);
  return (
    <View style={styles.box}>
      <TouchableOpacity
        onPress={() => {
          setCount(count + 1);
        }}
        style={styles.buttonInc}
      >
        <Text>+</Text>
      </TouchableOpacity>
      <Text>{count}</Text>
      <TouchableOpacity
        onPress={() => {
          setCount(count - 1);
        }}
        style={styles.buttonDec}
      >
        <View>
          <Text>-</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    alignItems: "center",
    justifyContent: "space-between",
    width: 70,
    height: 70,
    // borderWidth: 1,
    borderRadius: 10,
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
});
export default FoodCounter;
