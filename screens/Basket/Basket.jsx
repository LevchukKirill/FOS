import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import OrderList from "../../components/order/OrderList";
import DiscountList from "../../components/discount/DiscountList";
import OrderButton from "../../components/order/OrderButton";
import { useSelector } from "react-redux";
import { OrderContext } from "../../hooks/useOrder";

const Basket = () => {
  const basket = useSelector((state) => state.basket);
  const [order, setOrder] = useState("");

  // console.log(basket);
  return (
    //TODO: оборазить картинки в заказе
    <ScrollView style={{ paddingHorizontal: 10 }}>
      {Object.keys(basket.foods).length !== 0 ? (
        <View style={{ paddingBottom: 10 }}>
          <OrderContext.Provider value={{ order, setOrder }}>
            <OrderList />
            <DiscountList />
            <OrderButton />
          </OrderContext.Provider>
        </View>
      ) : (
        <View>
          <Text>Тут ничего нет :( </Text>
          <Text>Закажи что нибудь</Text>
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({});

export default Basket;
