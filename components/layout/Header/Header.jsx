import {
  Button,
  Linking,
  Text,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import Auth from "../Auth/Auth.jsx";
import React from "react";
import { COLORS } from "../../../constants";
import RestaurantsService from "../../../services/RestaurantsService";

const restService = new RestaurantsService();

const Header = () => {
  return (
    <View style={styles.header}>
      <View>
        <Pressable
          style={styles.authBtn}
          onPress={async () => {
            console.log(await restService.getAllRestaurants());
          }}
        >
          <Text>Binus</Text>
        </Pressable>
      </View>

      <View>
        <Auth />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 10,
    paddingBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  authBtn: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: COLORS.primary,
  },
});

export default Header;
