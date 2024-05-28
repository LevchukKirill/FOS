import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants";
import Payment from "../payment/Payment";
import { gStyle } from "../../styles/style";
import { useSelector } from "react-redux";
// import CircleLoad from "../../ui/loading/CircleLoad";

const OrderButton = (props) => {
  const costDelivery = 99;
  const [modalVisible, setModalVisible] = useState(false);

  const basket = useSelector((state) => state.basket.foods);
  let acum = 0;
  let amountFoods = 0;

  const result = (basket) => {
    Object.values(basket).map(({ data: food, amount }) => {
      acum += amount * food.price;
      amountFoods += amount;
      console.log(acum, amountFoods);
      // setPrice(acum);
    });
    return { acum, amountFoods };
  };

  const amountPrice = result(basket);

  return (
    <View style={styles.container}>
      <View
        style={{
          // paddingTop: 15,
          rowGap: 4,
          // justifyContent: "space-between",
          // alignContent: "center",
          // paddingHorizontal: 30
          paddingVertical: 8,
          width: "110%",
          alignItems: "center",
          borderTopWidth: 1,
          borderColor: "#EEEEEE",
        }}
      >
        <View style={styles.formText}>
          <Text style={{ fontSize: 15 }}>{amountPrice.amountFoods} товара</Text>
          <Text style={{ fontSize: 15 }}>
            {amountPrice.acum + costDelivery} ₽
          </Text>
        </View>
        <View style={styles.formText}>
          <Text style={{ fontSize: 15 }}>Начисление бонусов</Text>
          <Text style={{ fontSize: 15 }}>
            +{Math.floor(amountPrice.acum * 0.05)}
          </Text>
        </View>
        <View style={styles.formText}>
          <Text style={{ fontSize: 15 }}>Доставка</Text>
          <Text style={{ fontSize: 15 }}>{costDelivery} ₽</Text>
        </View>
      </View>
      <View
        style={{
          width: "110%",
          alignItems: "center",
          // paddingVertical: 10,
          // marginTop: 13,

          borderTopWidth: 1,
          bottom: 0,
          // paddingTop: 8,
          // borderWidth: 1,
          // margin: "auto",
          borderColor: "#EEEEEE",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          style={[gStyle.button, styles.orderButton]}
        >
          <Text style={[gStyle.textBtn, { fontSize: 18 }]}>Оформить заказ</Text>
        </TouchableOpacity>
      </View>
      <Modal
        // presentationStyle={"pageSheet"}
        animationType={"slide"}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ paddingTop: 60 }}>
          <Payment
            handler={() => {
              setModalVisible(false);
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // position: "absolute",
    bottom: 0,
    marginBottom: 10,
    // justifyContent: "space-around",
    justifyContent: "space-between",
    alignItems: "center",
    // opacity: 0.3,
    // borderWidth: 1,
    // position: "absolute",
    // backgroundColor: "transparent",
    // flex: 1,
    height: "22%",
    // bottom: 0,
    // left: 0,
    // marginTop: 80,
    width: "100%",
    // paddingVertical: 10,
    alignContent: "center",
  },
  formText: {
    // display: "flex",
    // columnGap: 10,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    // paddingVertical: 10,
  },
  orderButton: {
    // position: "absolute",
    // bottom: 0,
    marginTop: 10,
    // paddingTop: 10,
    // marginBottom: 20,
    // paddingTop: 10,
    alignItems: "center",
    height: 43,
    // borderWidth: 1,
    justifyContent: "center",
    // borderRadius: 20,
    width: "70%",
    // backgroundColor: COLORS.primary,
  },
});

export default OrderButton;
