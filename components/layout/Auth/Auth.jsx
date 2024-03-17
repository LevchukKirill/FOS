import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { COLORS } from "../../../constants/theme";

const Auth = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={[styles.modalView, styles.shadow]}>
          <Text style={{ fontSize: 15 }}>
            Вход в системы рестаранов ИП Султанов
          </Text>
          <Text style={{ fontSize: 20 }}>Номер телефона</Text>
          <Text style={{ fontSize: 10 }}>Введите свой номер телефона</Text>
          <TextInput
            style={styles.input}
            type="tel"
            placeholder="+7(9__)___-__-__"
          />
          <Pressable
            style={styles.button}
            onPress={() => setModalVisible(false)}
          >
            <Text style={{ color: COLORS.white }}>Продолжить</Text>
          </Pressable>
          <Text style={{ fontSize: 10 }}>
            Продолжая, вы соглашаетесь со сбором и обработкой персональных
            данных и пользовательским соглашением
          </Text>
        </View>
      </Modal>
      <View>
        <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
          <Text>Auth</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    height: "25%",
    width: "100%",
    position: "absolute",
    bottom: 100,
    marginBottom: 100,
    borderRadius: 50,
    padding: 15,
    backgroundColor: COLORS.white,
    flex: 1,
    justifyContent: "center",
  },
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
  },
  button: {
    // height: 20,
    // width: 50,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },
});

export default Auth;
