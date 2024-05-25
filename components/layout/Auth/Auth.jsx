import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  Pressable,
  Keyboard,
  StyleSheet,
} from "react-native";
import { COLORS } from "../../../constants/theme";
import UserService from "../../../services/UserService";
import { UserContext } from "../../../hooks/useUser";
import { gStyle } from "../../../styles/style";
import { BlurView } from "expo-blur";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [phone, setPhoneNumber] = useState("+79618634799");
  const [password, setPassword] = useState("qwerty12");
  const [modalVisible, setModalVisible] = useState(false);

  const [error, setError] = useState(undefined);
  const { setUser } = useContext(UserContext);

  const userService = new UserService();
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  return (
    <View>
      <Modal
        // presentationStyle={"pageSheet"}
        animationType={"slide"}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <BlurView intensity={25} tint="dark" style={styles.blurContainer}>
          <View
            style={[
              styles.modalView,
              styles.shadow,
              styles.blur,
              { height: "52%" },
            ]}
          >
            <View style={[gStyle.line, { height: "1.5%" }]}></View>

            <Text style={[gStyle.text, styles.text1, { marginTop: "4%" }]}>
              Вход в систему ресторанов
            </Text>

            <View>
              <Text
                style={[
                  gStyle.title,
                  {
                    marginLeft: "3%",
                    marginBottom: "1%",
                    marginTop: "7%",
                  },
                ]}
              >
                {isLogin ? "Авторизация" : "Регистрация"}
              </Text>
            </View>
            <TextInput
              onChangeText={setPhoneNumber}
              style={[styles.input, { height: "11.5%" }]}
              keyboardType="numeric"
              value={phone}
              placeholder="+7(9__)___-__-__"
              onBlur={() => Keyboard.dismiss()} ////////////////////////////////////////////////
              //static dismiss();
            />
            <TextInput
              onChangeText={setPassword}
              style={[styles.input, { height: "11.5%" }]}
              secureTextEntry={true}
              value={password}
              placeholder="Пароль"
              onBlur={() => Keyboard.dismiss()}
            />

            <Text
              style={{
                marginTop: "1%",
                fontSize: 14,
                fontWeight: "300",
                marginLeft: "3%",
              }}
            >
              {error ? "Неверный пароль или логин" : ""}
            </Text>
            <Pressable
              style={[
                gStyle.button,
                styles.button,
                {
                  marginTop: "1%",
                  height: "12%",
                },
              ]}
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
              <Text style={[gStyle.textBtn, { fontSize: 15 }]}>Продолжить</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setIsLogin(!isLogin);
              }}
            >
              <Text
                style={[
                  styles.anotherBtn,
                  { marginTop: keyboardStatus ? "2%" : "3%" },
                ]}
              >
                {isLogin ? "Зарегистрироваться" : "Войти в аккаунт"}
              </Text>
            </Pressable>
          </View>
        </BlurView>
      </Modal>
      <View>
        <Pressable
          style={gStyle.button}
          marginRight={"3%"}
          onPress={() => setModalVisible(true)}
        >
          <Text style={gStyle.textBtn}>Войти</Text>
        </Pressable>
        {/* <Pressable onPress={onClose}>
            
        </Pressable> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text1: {
    // marginTop: "4%",
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    // borderWidth: 1,
    bottom: 0,
    width: "100%",
    position: "absolute",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    backgroundColor: COLORS.white,
    flex: 1,
    rowGap: 5,
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
  blurContainer: {
    flex: 1,
    // padding: 20,
    //margin: 16,
    // textAlign: "center",
    // justifyContent: "center",
    overflow: "hidden",
    // borderRadius: 20,
  },
  input: {
    paddingHorizontal: "5%",
    backgroundColor: "rgba(211, 211, 211, 0.2)",
    borderRadius: 13,
    marginTop: "1%",
    fontSize: 14,
    fontStyle: "italic",
    color: "rgba(105, 105, 105, 1.0)",
  },
  button: {
    width: "100%",
    justifyContent: "center",
  },
  anotherBtn: {
    //bottom: 0,
    //marginTop: "3%",
    marginBottom: "0%",
    textDecorationLine: "underline",
    textDecorationColor: "#696969",
    textAlign: "center",
    opacity: 0.8,
    fontSize: 15,
  },
});

export default Auth;
