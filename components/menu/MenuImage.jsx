import React from "react";

import { Image, Text, View } from "react-native";

const MenuImage = ({ food }) => {
  return (
    <View
      style={{
        height: "100%",
        aspectRatio: "1/1",
      }}
    >
      <Image
        source={{ uri: process.env.EXPO_PUBLIC_API_URL + food?.img }}
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
};

export default MenuImage;
