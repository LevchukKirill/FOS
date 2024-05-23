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

const OrderType = (props) => {
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
              {
                backgroundColor: isActive
                  ? "rgba(250, 250, 250, 0.8)"
                  : "rgba(211, 211, 211, 0.0)",
              },
              styles.button,
            ]}
          >
            <Text>На доставку</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsActive(false)}
            style={[
              {
                backgroundColor: isActive
                  ? "rgba(211, 211, 211, 0.0)"
                  : "rgba(250, 250, 250, 0.8)",
              },
              styles.button,
            ]}
          >
            <Text>Самовывоз</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textBox}>
          <Text style={{ fontSize: 16 }}>
            {/*{console.log(props)}*/}
            {/*{isActive ? {} : { props }}*/}
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
    height: "20%",
    // position: "absolute",
    // height: "30%",b
    // marginHorizontal: "6%",
    paddingHorizontal: 20,
    // bottom: 0,
    // display: "flex",
    // justifyContent: "space-around",
    // left: "50%",
    // transform: ,
    // translate: "50%",
  },
  form: {
    width: "100%",
    height: "85%",
    backgroundColor: "rgba(211, 211, 211, 0.3)",
    // borderWidth: 1,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonHolder: {
    // borderWidth: 1,
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
    backgroundColor: "rgba(211, 211, 211, 0.8)", //'rgba(112, 128, 144, 0.7)'
    borderRadius: 9,
    justifyContent: "center",
  },
  button: {
    // borderWidth: 1,
    borderRadius: 5,
    width: "48%",
    height: "75%",
    alignItems: "center",
    marginHorizontal: 2,
    justifyContent: "center",
  },
  textBox: {
    // borderWidth: 1,
    width: "90%",
    alignItems: "center",
    marginTop: 15,
  },
});

export default OrderType;
