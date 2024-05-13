import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import { COLORS } from "../../constants";
import AdminOrderItem from "./AdminOrderItem";

const ModalOrder = (props) => {
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
            <Pressable onPress={props.handler}>
              <Text>НАЖМИ ЧТОБЫ ЗАКРЫТЬ</Text>
            </Pressable>
            <View>
              {Object.values(props?.info ?? {}).map((i) => (
                <View>
                  {/*<Text>{i.name}</Text>*/}
                  {/*<Text>{i.order_food.amount}</Text>*/}
                  {/*<Text>{i.price}</Text>*/}
                  <AdminOrderItem food={i} amount={i.order_food.amount} />
                </View>
              ))}
            </View>
            <Text>{props.info?.name ?? ""}</Text>
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
});

export default ModalOrder;
