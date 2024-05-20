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
  const [orderStatus, setOrderStatus] = useState(undefined);
  const status = [
    "CANCELED",
    "PAID",
    "COOKING",
    "READY",
    "DELIVERY",
    "DONE",
    "",
  ];
  const orderService = new OrderService();
  const [arrayIndex, setArrayIndex] = useState(undefined);

  useEffect(() => {
    // props.setStatus();
    let index = status.indexOf(props?.status);
    setArrayIndex(index + 1);
    setOrderStatus(status[index + 1]);
    // console.log(arrayIndex);
    return () => {};
  }, []);

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
              <View style={styles.btn}>
                <Text>НАЖМИ ЧТОБЫ ЗАКРЫТЬ</Text>
              </View>
            </TouchableOpacity>
            <View>
              {Object.values(props?.info ?? {}).map((i) => (
                <View key={i.foodInfoId}>
                  {/*{console.log(i)}*/}
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
                  setOrderStatus(status[arrayIndex + 1]);
                  setArrayIndex(arrayIndex + 1);
                  orderService.updateOrder(props.orderId, {
                    status: orderStatus,
                  });
                  console.log(arrayIndex);
                  props.handler();
                  // console.log(props);
                }}
              >
                <View style={styles.btn}>
                  <Text>{`Сменить статус на ${status[arrayIndex]}`}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setArrayIndex(1);
                  setOrderStatus(status[1]);
                  orderService.updateOrder(props.orderId, {
                    status: status[0],
                  });
                  props.handler();
                }}
              >
                <View style={styles.btn}>
                  <Text>{`Отменить заказ`}</Text>
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
    width: "100%",
    backgroundColor: COLORS.green,
    // width: "40%",
  },
});

export default ModalOrder;
