import React, { useState } from "react";

import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../constants";

const OrderType = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <View style={styles.main}>
      <View style={styles.form}>
        <View style={styles.buttonHolder}>
          <TouchableOpacity
            onPress={() => {
              setIsActive(true);
            }}
            style={[
              { backgroundColor: isActive ? COLORS.gray2 : COLORS.gray },
              styles.button,
            ]}
          >
            <Text>На доставку</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsActive(false)}
            style={[
              { backgroundColor: isActive ? COLORS.gray : COLORS.gray2 },
              styles.button,
            ]}
          >
            <Text>Самовывоз</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textBox}>
          <Text style={{ fontSize: 16 }}>
            {isActive ? "{адрес пользователя}" : "{адрес заведения}"}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    // borderWidth: 1,
    width: "100%",
    height: "18%",
    // position: "absolute",
    // height: "30%",
    paddingHorizontal: 10,
    // marginHorizontal: 10,
    // bottom: 0,
    // display: "flex",
    // justifyContent: "space-around",
    // left: "50%",
    // transform: ,
    // translate: "50%",
  },
  form: {
    width: "100%",
    height: "90%",
    backgroundColor: COLORS.lightGray1,
    // borderWidth: 1,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonHolder: {
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    width: "94%",
    height: 30,
    // height: "30%",
    flexDirection: "row",
    flexWrap: "wrap",
    // columnGap: 20,
    backgroundColor: COLORS.gray,
    borderRadius: 9,
    justifyContent: "center",
  },
  button: {
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
    marginHorizontal: 2,
  },
  textBox: {
    // borderWidth: 1,
    width: "90%",
    alignItems: "center",
    marginTop: 15,
  },
});

export default OrderType;
