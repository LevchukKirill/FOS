import React from "react";

import { Text, View, StyleSheet } from "react-native";
// import FoodCounter from "../order/FoodCounter";
import MenuButton from "./MenuButton";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store/basket/BasketSlice";

const MenuItem = ({ food }) => {
  const { basket } = useSelector((state) => state);

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View>
        <Text>{food.name}</Text>
        <Text>{food.price}</Text>
      </View>
      <MenuButton
        count={basket[food.id]?.amount ?? 0}
        inc={() => dispatch(actions.addToBasket(food))}
        dec={() => dispatch(actions.removeFromBasket(food))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    // justifyContent: "center",
    // alignContent: "center",
    width: "100%",
    // height: ,
    // borderWidth: 1,
    marginBottom: 5,
    // borderWidth: 1,
    paddingHorizontal: 20,
  },
});

export default MenuItem;
