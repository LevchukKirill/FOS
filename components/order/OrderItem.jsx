import React from "react";

import { Text, View, StyleSheet, Image, LogBox } from "react-native";
import FoodCounter from "./FoodCounter";
import MenuButton from "../menu/MenuButton";
import { useActions } from "../../hooks/useActions";
import { useSelector } from "react-redux";
import { getKey } from "../../store/basket/BasketSlice";
import { COLORS } from "../../constants";

const OrderItem = ({ food, amount }) => {
  const basket = useSelector((state) => state.basket.foods);
  const { addToBasket, removeFromBasket } = useActions();

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Text></Text>
      </View>
      <View style={styles.productText}>
        <Text>{food.name}</Text>
        <Text>{food.foodInfoId}</Text>
        <Text>{food.price * amount} руб.</Text>
      </View>
      <View>
        <MenuButton
          count={basket[getKey(food)]?.amount ?? 0}
          inc={() => addToBasket(food)}
          dec={() => removeFromBasket(food)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    columnGap: 10,
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

export default OrderItem;
