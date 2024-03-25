import React from "react";

import { Text, View } from "react-native";
import { COLORS } from "../../constants";

const DiscountList = () => {
  return (
    <View
      style={{
        width: "100%",
        height: 70,
        backgroundColor: COLORS.lightGray1,
        borderRadius: 20,
        marginTop: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>скидки и не только</Text>
    </View>
  );
};

export default DiscountList;
