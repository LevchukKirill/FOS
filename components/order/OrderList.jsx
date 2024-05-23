import React, { useEffect, useState } from "react";
import OrderItem from "./OrderItem";

import { Text, View, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";
import { useSelector } from "react-redux";
import { getKey } from "../../store/basket/BasketSlice";
import OrderButton from "./OrderButton";

const OrderList = () => {
  // const [cost, setCost] = useState(null);
  // const [price, setPrice] = useState(0);

  const basket = useSelector((state) => state.basket.foods);
  let acum = 0;
  let amountFoods = 0;

  const result = (basket) => {
    Object.values(basket).map(({ data: food, amount }) => {
      acum += amount * food.price;
      amountFoods += amount;
      console.log(acum, amountFoods);
      // setPrice(acum);
    });
    return { acum, amountFoods };
  };

  const amountPrice = result(basket);
  // useEffect(
  //   (basket) => {
  //     console.log(basket);
  //     if (!basket) return;
  //
  //     // return () => {
  //     //   console.log(basket);
  //     // };
  //   },
  //
  //   [basket],
  // );
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        {" "}
        В корзине {amountPrice.amountFoods} товара
      </Text>
      {Object.values(basket).map(({ data: food, amount }) => (
        <OrderItem food={food} amount={amount} key={getKey(food)} />
      ))}
      {/*// setCost(amount + price);*/}
      {/*// console.log(food.price * amount + food.price);*/}
      {/*// console.log(food.price * amount);*/}

      {/*// {console.log(setPrice(food.price * amount + food.price))}*/}
    </View>
    // {/*// /!*/*<View>{console.log(food.price * amount)}</View>*/*!/*/}
  );
};
const styles = StyleSheet.create({
  orderText: {
    position: "absolute",
    top: 2,
    left: -2,
  },
  container: {
    // position: "relative",
    width: "100%",
    // height: "100%",
    // backgroundColor: "rgb(240,240,240)",
    // borderWidth: 1,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    padding: 10,
    // paddingBottom: 10,
    flexDirection: "column",
    rowGap: 20,
  },
});

export default OrderList;
