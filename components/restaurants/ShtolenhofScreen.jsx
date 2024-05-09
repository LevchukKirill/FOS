import React, { useContext } from "react";

import { ScrollView, Text, View, StyleSheet } from "react-native";
import { COLORS } from "../../constants";
import { UserContext } from "../../hooks/useUser";
import UsersOrders from "../admin/UsersOrder";

const ShtolenhofScreen = (props) => {
  const { user } = useContext(UserContext);
  // const userService = new UserService();
  // console.log(props);
  if (user?.role === "ADMIN")
    return (
      <ScrollView>
        <Text> Вы важный тип</Text>
        <View style={styles.container}>
          <UsersOrders restaurantId={props.restaurantId} />
        </View>
      </ScrollView>
    );
  // userService.auth();
  // if (user?.role === "USER")
  else
    return (
      <ScrollView style={{ flex: 1, backgroundColor: COLORS.black }}>
        {/*<Categories />*/}
        {/*<Categories />*/}
      </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    overflow: "hidden",
  },
});

export default ShtolenhofScreen;
