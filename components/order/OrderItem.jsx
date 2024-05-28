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
      <View style={{ aspectRatio: "1/1", flex: 0.5 }}>
        <Image
          style={styles.image}
          source={{ uri: process.env.EXPO_PUBLIC_API_URL + food.img }}
        />
      </View>

      <View style={styles.productText}>
        <Text style={{ fontWeight: 600, fontSize: 16 }}>{food.name}</Text>
        <Text style={{ fontSize: 12, color: COLORS.gray }}>
          {food.food_info.description}
        </Text>
        {/*<Text>{food.price * amount} руб.</Text>*/}
      </View>
      <View
        style={{
          width: "20%",
          // paddingRight: 10,
          // borderWidth: 1,
          // height: "100%",
          //   justifyContent:
          flex: 0.5,
          justifyContent: "space-around",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Text>{food.price * amount} руб.</Text>
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
    flex: 1,
    // justifyContent: "space-around",
    width: "100%",
    // height: "10%",
    flexDirection: "row",
    columnGap: 10,
    // borderWidth: 1,
  },
  productText: {
    flex: 1,
    padding: 5,
    // minWidth: "70%",
    height: "100%",
    // borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default OrderItem;
