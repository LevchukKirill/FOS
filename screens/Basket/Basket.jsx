import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import OrderList from "../../components/order/OrderList";
import DiscountList from "../../components/discount/DiscountList";
import OrderButton from "../../components/order/OrderButton";
import { useSelector } from "react-redux";
import { OrderContext } from "../../hooks/useOrder";
import { COLORS, SIZES } from "../../constants";
import Map from "../../components/map/Map";
import YaMap from "react-native-yamap";
import CurrentOrder from "../../components/order/CurrentOrder";
import { UserContext } from "../../hooks/useUser";

const Basket = () => {
  const basket = useSelector((state) => state.basket);
  const [order, setOrder] = useState("");

  const { user } = useContext(UserContext);
  // console.log(basket);
  return (
    <ScrollView
      style={{ paddingHorizontal: 10, backgroundColor: COLORS.white }}
    >
      {Object.keys(basket.foods).length !== 0 ? (
        <View style={{ paddingVertical: 10 }}>
          <OrderContext.Provider value={{ order, setOrder }}>
            <OrderList />
            {/*<DiscountList />*/}
            <CurrentOrder id={user?.id} />
            <OrderButton />
          </OrderContext.Provider>
        </View>
      ) : (
        <View style={{ paddingBottom: 10 }}>
          <Text>Тут ничего нет :( </Text>
          <Text>Закажи что нибудь</Text>
          <Map />
          <CurrentOrder id={user?.id} />
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,

    // borderRadius: SIZES.radius,
    borderRadius: 25,
  },
});

export default Basket;
