import React from "react";

import { Text, View, StyleSheet } from "react-native";
import MenuButton from "./MenuButton";
import { useActions } from "../../hooks/useActions";
import { useBasket } from "../../hooks/useBasket";

const MenuItem = ({ food }) => {
  const { basket } = useBasket();

  const { addToBasket, removeFromBasket } = useActions();

  return (
    <View style={styles.container}>
      <View>
        <Text>{food.name}</Text>
        <Text>{food.price}</Text>
      </View>
      <MenuButton
        count={basket[food.id]?.amount ?? 0}
        inc={() => addToBasket(food)}
        dec={() => removeFromBasket(food)}
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
