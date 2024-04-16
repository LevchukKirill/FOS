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
import UserService from "../../../services/UserService";

const Auth = () => {
  const [isExist, setIsExist] = useState(false);
  const [phone, setPhoneNumber] = useState("+");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const userService = new UserService();

  return (
    <View>
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={[styles.modalView, styles.shadow]}>
          <Text style={{ fontSize: 15 }}>
            Вход в системы рестаранов ИП Султанов
          </Text>
          <View>
            <Text style={{ fontSize: 20 }}>
              {isExist ? "Авторизация" : "Регистрация"}
            </Text>
            <Text style={{ fontSize: 10 }}>
              Введите свой номер телефона и пароль
            </Text>
            <TextInput
              onChangeText={setPhoneNumber}
              style={styles.input}
              keyboardType="numeric"
              value={phone}
              placeholder="+7(9__)___-__-__"
            />
          </View>
          <TextInput
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry={true}
            placeholder="Пароль"
          />
          <Pressable
            style={styles.button}
            onPress={async () => {
              const userJWT = isExist
                ? await userService.authUser({ phone, password })
                : await userService.createUser({ phone, password });
              userJWT ? setModalVisible(false) : () => {};
            }}
          >
            <Text style={{ color: COLORS.white }}>Продолжить</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              setIsExist(!isExist);
            }}
          >
            <Text style={{ color: COLORS.white }}>
              {isExist ? "Регистрация" : "Авторизация"}
            </Text>
          </Pressable>
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
    width: "100%",

    position: "absolute",
    bottom: -50,
    marginBottom: 100,
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    flex: 1,
    rowGap: 5,
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
    paddingHorizontal: 5,
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
