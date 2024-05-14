import React from "react";

import { Text, View, StyleSheet, Image, LogBox } from "react-native";
import { COLORS } from "../../constants";

const AdminOrderItem = (props) => {
  return (
    <View style={styles.container}>
      {/*<View>*/}
      <View style={styles.image}>
        <Text></Text>
      </View>
      <View style={styles.productText}>
        {/*<View>*/}
        <Text>{props.food.name}</Text>
        <Text>{props.food.foodInfoId}</Text>
        <Text>{props.food.price * props.amount} руб.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    display: "flex",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    // columnGap: 10,
    // rowGap: 10,
    // borderWidth: 1,
  },
  productText: {
    flex: 1,
    height: "100%",
    borderWidth: 1,
  },
  image: {
    aspectRatio: 1,
    width: 60,
    backgroundColor: COLORS.white,
  },
});

export default AdminOrderItem;
