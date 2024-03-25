import React from "react";

import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
} from "react-native";
import { COLORS, SIZES } from "../../constants";

const DiscountButton = ({ isActive, clickHandler }) => {
  return (
    <TouchableHighlight
      onPress={clickHandler}
      underlayColor={COLORS.primary}
      style={styles.shadow}
    >
      <View
        style={{
          backgroundColor: isActive ? COLORS.primary : COLORS.white,
          alignItems: "center",
          paddingTop: 5,
          borderRadius: SIZES.radius,
        }}
      >
        <Image style={{ width: 75, height: 75 }} />
        <Text style={{ fontSize: SIZES.h4 }}>Акции</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  discountButton: {},
});

export default DiscountButton;
