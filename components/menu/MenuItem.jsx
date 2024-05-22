import React, { useEffect, useState } from "react";

import { Text, View, StyleSheet, Image } from "react-native";
import MenuButton from "./MenuButton";
import { useActions } from "../../hooks/useActions";
import { useSelector } from "react-redux";
import { getKey } from "../../store/basket/BasketSlice";

const MenuItem = ({ food, isActive, isEnabled }) => {
  // const [active, setActive] = useState(false);

  // setActive(isActive);

  const basket = useSelector((state) => state.basket.foods);

  const { addToBasket, removeFromBasket } = useActions();
  // console.log(process.env.EXPO_PUBLIC_API_URL + food?.img);
  return (
    <View
      style={
        isEnabled
          ? isActive
            ? styles.activeContainer
            : styles.container
          : styles.disabledContainer
      }
    >
      {/*<View style={ ? styles.activeContainer : styles.container }>*/}
      {/*<View style={{ flexDirection: "row", display: "flex", borderWidth: 1 }}>*/}
      <View
        style={{
          // width: isActive ? "50%" : "100%",
          height: "100%",
          // borderWidth: 1,
          aspectRatio: "1/1",
        }}
      >
        <Image
          source={{ uri: process.env.EXPO_PUBLIC_API_URL + food?.img }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      {/*<Text>{food?.price}</Text>*/}

      {isActive ? (
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
              padding: 10,
              alignItems: "center",
              // borderWidth: 1,
              height: "100%",
              // rowGap: 10,
              // paddingVertical: 20
              justifyContent: "center",
              rowGap: 10,
            }}
          >
            <Text>{food?.name}</Text>
            <Text>{food?.price} Р</Text>
            <MenuButton
              count={basket[getKey(food)]?.amount ?? 0}
              inc={() => addToBasket(food)}
              dec={() => removeFromBasket(food)}
            />
          </View>
        </View>
      ) : (
        <></>
      )}

      {/*</View>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width: "100%",
    height: "180%",
    flexDirection: "row",
    display: "flex",

    // aspectRatio: "1/1",
    // display: "flex",
    // alignContent: "center",
    // justifyContent: "space-between",

    // flex: 1,
    // borderWidth: 1,
    // marginBottom: 5,
    // borderWidth: 1,
    // paddingHorizontal: 20,
  },
  activeContainer: {
    // display: "flex",
    // justifyContent: "space-around",
    // alignContent: "center",
    // justifyContent: "center",
    // columnGap: 5,
    // alignItems: "center"
    // padding: 10,
    // aspectRatio: "1/1",
    // marginBottom: 5,
    // borderWidth: 1,
    // paddingHorizontal: 0,
    // paddingHorizontal: 20,
    justifyContent: "space-between",
    width: "100%",
    height: "180%",
    flexDirection: "row",
  },
  disabledContainer: {
    justifyContent: "space-between",
    width: "100%",
    height: "130%",
    flexDirection: "row",
  },
});

export default MenuItem;
