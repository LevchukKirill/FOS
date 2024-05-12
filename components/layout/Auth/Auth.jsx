import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  Pressable,
} from "react-native";
import { COLORS } from "../../../constants/theme";
import UserService from "../../../services/UserService";
import { UserContext } from "../../../hooks/useUser";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [phone, setPhoneNumber] = useState("+79618634799");
  const [password, setPassword] = useState("qwerty12");
  const [modalVisible, setModalVisible] = useState(false);

  const [error, setError] = useState(undefined);
  const { setUser } = useContext(UserContext);

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
              {isLogin ? "Авторизация" : "Регистрация"}
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
            value={password}
            placeholder="Пароль"
          />
          <Pressable
            style={styles.button}
            onPress={async () => {
              const data = isLogin
                ? userService.login({ phone, password })
                : userService.register({ phone, password });
              data

                .then(() => {
                  setModalVisible(false);
                  userService.auth().then(setUser);
                })
                .catch(setError);
            }}
          >
            <Text style={{ color: COLORS.white }}>Продолжить</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              setIsLogin(!isLogin);
            }}
          >
            <Text style={{ color: COLORS.white }}>
              {isLogin ? "Регистрация" : "Авторизация"}
            </Text>
          </Pressable>
          <Text>{error ? "Неверный пароль или логин" : ""}</Text>
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
    bottom: 200,
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
