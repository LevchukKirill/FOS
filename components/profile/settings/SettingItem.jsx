import React from "react";

import { Text, View, StyleSheet, Pressable } from "react-native";

const SettingItem = (props) => {
  return (
    <View>
      <Pressable>
        <Text>{props.name}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SettingItem;
