import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import OrderType from "../../components/order/OrderType";
import OrderList from "../../components/order/OrderList";
import DiscountList from "../../components/discount/DiscountList";
import OrderButton from "../../components/order/OrderButton";

const Basket = () => {
  return (
    <ScrollView style={{ paddingHorizontal: 10 }}>
      <View style={{ paddingBottom: 10 }}>
        <OrderList />
        <DiscountList />
        <OrderButton />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({});

export default Basket;
