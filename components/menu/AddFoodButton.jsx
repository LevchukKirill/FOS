import React from "react";

import { Pressable, Text, View, StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const AddFoodButton = (props) => {
  return (
    <Pressable
      onPress={props.clickHandler}
      style={[
        styles.button,
        { backgroundColor: props.plus ? COLORS.green : COLORS.red },
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
    // width: "50%",
    alignItems: "center",
    flexGrow: 1,
    height: 20,
  },
});

export default AddFoodButton;
