import React, { useState } from "react";
import OrderItem from "./OrderItem";

import { Text, View, StyleSheet } from "react-native";
import { COLORS } from "../../constants";
import { useSelector } from "react-redux";
import { getKey } from "../../store/basket/BasketSlice";

const OrderList = () => {
  const [cost, setCost] = useState(null);
  const [price, setPrice] = useState(null);

  const basket = useSelector((state) => state.basket.foods);

  return (
    <View style={{ paddingTop: 30 }}>
      <View style={styles.container}>
        {Object.values(basket).map(({ data: food, amount }) => (
          // setPrice(food.price * amount + price)
          // setCost(amount + price);
          // console.log(cost);
          <OrderItem food={food} amount={amount} key={getKey(food)} />

          /*<View>{console.log(food.price * amount)}</View>*/
        ))}
      </View>
      <View style={styles.orderText}>
        <Text style={{ fontSize: 18 }}>{`${cost} товара на ${price} руб`}</Text>
      </View>
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
    width: "100%",
    backgroundColor: COLORS.lightGray1,
    // borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    flexDirection: "column",
    rowGap: 15,
  },
});

export default OrderList;
