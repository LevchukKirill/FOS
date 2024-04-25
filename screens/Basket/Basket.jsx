import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import OrderList from "../../components/order/OrderList";
import DiscountList from "../../components/discount/DiscountList";
import OrderButton from "../../components/order/OrderButton";
import { useSelector } from "react-redux";

const Basket = () => {
  const basket = useSelector((state) => state.basket);
  // console.log(basket);
  return (
    //TODO: оборазить картинки в заказе
    <ScrollView style={{ paddingHorizontal: 10 }}>
      {Object.keys(basket).length !== 0 ? (
        <View style={{ paddingBottom: 10 }}>
          <OrderList />
          <DiscountList />
          <OrderButton />
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
