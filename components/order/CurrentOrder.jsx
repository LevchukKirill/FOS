import React, { useEffect, useState } from "react";

import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Modal,
  Button,
  ScrollView,
} from "react-native";
import OrderService from "../../services/OrderService";
import { COLORS } from "../../constants";
import CurrentOrderItem from "./CurrentOrderItem";

const CurrentOrder = (props) => {
  const [currentOrders, setCurrentOrders] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const orderService = new OrderService();

  useEffect(() => {
    orderService.getCurrentOrderById(props.id).then((response) => {
      setCurrentOrders(response);
      console.log(response);
    });
  }, [props.id]);

  return (
    <View>
      <Modal
        presentationStyle={"pageSheet"}
        animationType={"slide"}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Button
            title={"Закрыть"}
            color={COLORS.green}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          />
          <ScrollView>
            {currentOrders?.map((item) => (
              <View style={{ padding: 10 }}>
                <CurrentOrderItem order={item} />
              </View>
            ))}
          </ScrollView>
        </View>
      </Modal>
      {currentOrders ? (
        <TouchableOpacity
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.button}>
            <Text>Посмотреть текущие заказы</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <Text>Заказов нет</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: COLORS.lightGray1,
  },
  modalView: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    top: "10%",
    paddingVertical: 10,
    backgroundColor: COLORS.lightGray1,
  },
});

export default CurrentOrder;
