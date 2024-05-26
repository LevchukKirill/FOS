import React from "react";

import { Text, View } from "react-native";
import MenuButton from "./MenuButton";
import { getKey } from "../../store/basket/BasketSlice";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";

const MenuInfo = ({ food }) => {
  const basket = useSelector((state) => state.basket.foods);
  const { addToBasket, removeFromBasket } = useActions();

  return (
    <View
      style={{
        // borderWidth: 1,
        width: "50%",
        height: "100%",
        padding: 0,
        // justifyContent: "space-around",
        // marginHorizontal: 40,
      }}
    >
      <View
        style={{
          padding: 5,
          marginLeft: -5,
          marginRight: 5,
          alignItems: "center",
          // borderWidth: 1,
          height: "100%",
          // rowGap: 10,
          // paddingVertical: 20
          justifyContent: "center",
          rowGap: 10,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "#E0E0E0" }}>{food?.name}</Text>
          <Text style={{ color: "#E0E0E0" }}>{food?.price} ₽</Text>
        </View>
        <MenuButton
          count={basket[getKey(food)]?.amount ?? 0}
          inc={() => addToBasket(food)}
          dec={() => removeFromBasket(food)}
        />
      </View>
    </View>
  );
};

export default MenuInfo;
