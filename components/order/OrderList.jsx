import React, { useState } from "react";
import OrderItem from "./OrderItem";

import { Text, View, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";
import { useSelector } from "react-redux";
import { getKey } from "../../store/basket/BasketSlice";

const OrderList = () => {
  const [cost, setCost] = useState(null);
  const [price, setPrice] = useState(null);

  const basket = useSelector((state) => state.basket.foods);

  return (
    <View style={styles.container}>
      {Object.values(basket).map(({ data: food, amount }) => (
        // setPrice(food.price * amount + price)
        // setCost(amount + price);
        // console.log(cost);
        <OrderItem food={food} amount={amount} key={getKey(food)} />

        /*<View>{console.log(food.price * amount)}</View>*/
      ))}
    </View>
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
    // paddingTop: 10,
    flexDirection: "column",
    rowGap: 20,
  },
});

export default OrderList;
