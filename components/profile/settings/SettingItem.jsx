import React from "react";

import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../../../constants";

const SettingItem = (props) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.text}>{props.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: "100%",
    borderWidth: 1,
    padding: 5,
    borderColor: COLORS.primary,
    borderRadius: 10,
  },
  text: {
    fontSize: 14,
  },
});

export default SettingItem;
