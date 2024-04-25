import React from "react";

import { Text, View, StyleSheet, ScrollView } from "react-native";
import MenuItem from "./MenuItem";

const Menu = (props) => {
  // console.log(props.foods);
  return (
    <ScrollView style={styles.menu}>
      <View>
        {props.foods.map((food, id) => (
          <View key={id}>
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
    columnGap: 0,
    // justifyContent: "center",
    // borderWidth: 1,
    width: "36%",
  },
});
export default Menu;
