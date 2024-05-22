import React from "react";

import { Pressable, Text, View, StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const AddFoodButton = (props) => {
  return (
    <Pressable
      onPress={props.clickHandler}
      style={[
        styles.button,
        { backgroundColor: props.plus ? COLORS.primary : COLORS.red },
      ]}
    >
      <View>
        <Text>{props.name}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    // borderWidth: 1,
    maxWidth: "100%",
    minWidth: "33%",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    height: "100%",
  },
});

export default AddFoodButton;
