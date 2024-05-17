import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../constants";
import AdminOrderItem from "./AdminOrderItem";
import OrderService from "../../services/OrderService";

const ModalOrder = (props) => {
  const orderService = new OrderService();

  // console.log(props);
  return (
    <View>
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={props.visible}
        onRequestClose={props.handler}
      >
        <ScrollView style={styles.modalView}>
          <View>
            <TouchableOpacity onPress={props.handler}>
              <Text>НАЖМИ ЧТОБЫ ЗАКРЫТЬ</Text>
            </TouchableOpacity>
            <View>
              {Object.values(props?.info ?? {}).map((i) => (
                <View key={i.foodInfoId}>
                  {/*<Text>{i.name}</Text>*/}
                  {/*<Text>{i.order_food.amount}</Text>*/}
                  {/*<Text>{i.price}</Text>*/}
                  <AdminOrderItem food={i} amount={i.order_food.amount} />
                </View>
              ))}
            </View>
            {/*<Text>{props.info?.name ?? ""}</Text>*/}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 10,
                // paddingTop: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  orderService.ready(props.orderId, true);
                  props.handler();
                  // console.log(props);
                }}
              >
                <View style={styles.btn}>
                  <Text>Сменить стаус +</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  orderService.ready(props.orderId, false);
                  props.handler();
                }}
              >
                <View style={styles.btn}>
                  <Text>Сменить стаус -</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: "100%",
    top: "15%",
    paddingVertical: 10,
    backgroundColor: COLORS.lightGray1,
  },
  btn: {
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    width: 150,
    backgroundColor: COLORS.green,
    // width: "40%",
  },
});

export default ModalOrder;
