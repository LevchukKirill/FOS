import React, { useEffect, useState } from "react";

import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../constants";
import SearchAddress from "../map/SearchAddress";

const OrderType = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [restAddress, setRestAddress] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [shownSearch, setShownSearch] = useState(false);
  useEffect(() => {
    setRestAddress(props.restAddress);
  }, []);

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
          <SearchAddress
            isActive={isActive}
            restAddress={restAddress}
            userAddress={userAddress}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "20%",
    paddingHorizontal: 20,
  },
  form: {
    width: "100%",
    height: "85%",
    backgroundColor: "rgba(211, 211, 211, 0.3)",
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
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "rgba(211, 211, 211, 0.8)", //'rgba(112, 128, 144, 0.7)'
    borderRadius: 9,
    justifyContent: "center",
  },
  button: {
    borderRadius: 5,
    width: "48%",
    height: "75%",
    alignItems: "center",
    marginHorizontal: 2,
    justifyContent: "center",
  },
  textBox: {
    width: "90%",
    alignItems: "center",
    marginTop: 15,
  },
});

export default OrderType;
