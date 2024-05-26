import React from "react";

import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../../../constants";

const SettingItem = (props) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity
        disabled={props.disabled}
        onPress={() => {
          if (typeof props.handler === "function") props.handler();
        }}
      >
        <Text
          style={[
            styles.text,
            { color: props.red ? "rgba(210, 34, 34, 1.0)" : "" },
          ]}
        >
          {props.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: "100%",
    padding: 5,
  },
  text: {
    fontSize: 16,
  },
});

export default SettingItem;
