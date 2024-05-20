import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import OrderList from "../../components/order/OrderList";
import DiscountList from "../../components/discount/DiscountList";
import OrderButton from "../../components/order/OrderButton";
import { useSelector } from "react-redux";
import { OrderContext } from "../../hooks/useOrder";
import { COLORS } from "../../constants";
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
    // TODO: Оборазить картинки в заказе и меню
    // TODO: Пагинация (генерация позиций меню (максимум 6 позиций в столе))
    // TODO: Обнуление состояния стола(после смены ресторана) и корзины(после смены пользователя)
    // TODO: Красивые поля редактирования пользователя
    <ScrollView
      style={{ paddingHorizontal: 10, backgroundColor: COLORS.white }}
    >
      {Object.keys(basket.foods).length !== 0 ? (
        <View style={{ paddingBottom: 10 }}>
          <OrderContext.Provider value={{ order, setOrder }}>
            <OrderList />
            <DiscountList />
            <OrderButton />
          </OrderContext.Provider>
        </View>
      ) : (
        <View style={{ paddingBottom: 10 }}>
          <Text>Тут ничего нет :( </Text>
          <Text>Закажи что нибудь</Text>
          <Map />
        </View>
      )}
      <CurrentOrder id={user?.id} />
    </ScrollView>
  );
};
const styles = StyleSheet.create({});

export default Basket;
