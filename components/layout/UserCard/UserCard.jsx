import React, { useContext, useEffect, useState } from "react";

import { gStyle } from "../../../styles/style";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Modal,
  Button,
  ScrollView,
} from "react-native";
import { COLORS } from "../../../constants";
import CurrentOrderItem from "../../order/CurrentOrderItem";
import UserService from "../../../services/UserService";
import { SvgXml } from "react-native-svg";
import { UserContext } from "../../../hooks/useUser";

const UserCard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [barcodeURL, setBarcodeURL] = useState(undefined);

  const userService = new UserService();
  const { user } = useContext(UserContext);

  useEffect((props) => {
    (async () => {
      const url = await userService.getBarcode();
      setBarcodeURL(url);
      // console.log(url);
    })();
  }, []);

  return (
    <View>
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Button
            title={"Закрыть"}
            color={COLORS.green}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          />
          <Text>{`Карта пользователя: ${user.name}`}</Text>
          {barcodeURL ? (
            <View
              style={{
                paddingHorizontal: 10,
                // borderWidth: 1,
                height: 180,
                width: "100%",
                // alignContent: "center",
                justifyContent: "center",
                // alignItems: "center",
                // margin: 0,
                // padding: 0,
              }}
            >
              <SvgXml width="100%" xml={barcodeURL} />
            </View>
          ) : (
            <Text>Loading..</Text>
          )}
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => setModalVisible(!modalVisible)}
        style={gStyle.button}
      >
        <Text style={gStyle.textBtn}>Карта лояльности</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    // alignContent: "center",
    alignItems: "center",
    width: "100%",
    height: "30%",
    borderRadius: 20,
    top: "5%",
    bottom: "10%",
    padding: 10,
    backgroundColor: COLORS.lightGray1,
  },
});

export default UserCard;
