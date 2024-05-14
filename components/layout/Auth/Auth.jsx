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
import { gStyle } from "../../../styles/style";

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
        {/* <Button onPress{() => setModalVisible(false)}/> */}

        <View style={[styles.modalView, styles.shadow]}>
          <View style={gStyle.line}></View>

          <Text style={[gStyle.text, styles.text1, {}]}>
            Вход в систему ресторанов
          </Text>

          <View>
            <Text
              style={[
                gStyle.title,
                { marginLeft: "3%", marginTop: "10%", marginBottom: "1%" },
              ]}
            >
              {isLogin ? "Авторизация" : "Регистрация"}
            </Text>
            {/* <Text style={[gStyle.text, {fontSize: 14}]}>
              Введите свой номер телефона и пароль
            </Text> */}
          </View>
          <TextInput
            onChangeText={setPhoneNumber}
            style={styles.input}
            keyboardType="numeric"
            value={phone}
            placeholder="+7(9__)___-__-__"
          />
          <TextInput
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry={true}
            value={password}
            placeholder="Пароль"
          />
          <Pressable
            style={[gStyle.button, styles.button, { marginTop: "5%" }]}
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
            <Text style={[gStyle.textBtn, { fontSize: "15%" }]}>
              Продолжить
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setIsLogin(!isLogin);
            }}
          >
            <Text style={styles.anotherBtn}>
              {isLogin ? "Зарегистрироваться" : "Войти в аккаунт"}
            </Text>
          </Pressable>
          <Text>{error ? "Неверный пароль или логин" : ""}</Text>
        </View>
      </Modal>
      <View>
        <Pressable
          style={gStyle.button}
          marginRight={"3%"}
          onPress={() => setModalVisible(true)}
        >
          <Text style={gStyle.textBtn}>Войти</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text1: {
    marginTop: "5%",
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "100%",
    //position: "absolute",
    bottom: 0,
    marginBottom: 0,
    marginTop: "120%",
    //marginEnd: 100,
    borderRadius: 30,

    //paddingVertical: 30,
    paddingHorizontal: 30,
    backgroundColor: COLORS.white,
    flex: 1,
    rowGap: 5,
    //justifyContent: 'center',
  },
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  input: {
    paddingHorizontal: "5%",
    backgroundColor: "rgba(211, 211, 211, 0.3)",
    borderRadius: 13,
    height: "12%",
    marginTop: "1%",
    fontSize: "14%",
    fontStyle: "italic",
    color: "rgba(105, 105, 105, 1.0)",
  },
  button: {
    width: "100%",
    height: "13%",
    justifyContent: "center",
  },
  anotherBtn: {
    //bottom: 0,
    marginTop: "3%",
    marginBottom: "0%",
    textDecorationLine: "underline",
    textDecorationColor: "#696969",
    textAlign: "center",
    opacity: 0.8,
    fontSize: "15%",
  },
});

export default Auth;
