import React from "react";

import { Text, View, StyleSheet, Image } from "react-native";
import FoodCounter from "./FoodCounter";
import MenuButton from "../menu/MenuButton";
import { useActions } from "../../hooks/useActions";
import { useSelector } from "react-redux";
import { getKey } from "../../store/basket/BasketSlice";

const OrderItem = ({ food, amount }) => {
  const basket = useSelector((state) => state.basket);
  const { addToBasket, removeFromBasket } = useActions();

  return (
    <View style={styles.container}>
      <FoodCounter name={"Я картинка"} />
      <View style={styles.productText}>
        <Text>{food.name}</Text>
        <Text>{food.foodInfoId}</Text>
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
});

export default OrderItem;
