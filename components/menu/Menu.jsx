import React from "react";

import { Text, View, StyleSheet, ScrollView } from "react-native";
import MenuItem from "./MenuItem";

const Menu = ({ foods }) => {
  return (
    <ScrollView style={styles.menu}>
      <View>
        {foods.map((food) => (
          <View>
            <MenuItem food={food} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  menu: {
    flexDirection: "column",
    alignContent: "center",
    display: "flex",
    // justifyContent: "center",
    // borderWidth: 1,
    width: "36%",
  },
});
export default Menu;
