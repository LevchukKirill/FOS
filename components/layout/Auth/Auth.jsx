import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  BackHandler,
  presentationStyle,
} from "react-native";
import { COLORS } from "../../../constants/theme";
import UserService from "../../../services/UserService";
import { UserContext } from "../../../hooks/useUser";
import { gStyle } from "../../../styles/style";
import { BlurView } from "expo-blur";
import { Keyboard } from "react-native";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [phone, setPhoneNumber] = useState("+79618634799");
  const [password, setPassword] = useState("qwerty12");
  const [modalVisible, setModalVisible] = useState(false);

  const [error, setError] = useState(undefined);
  const { setUser } = useContext(UserContext);

  const userService = new UserService();
  // const modalClose = () => {
  //   setModalVisible(false);
  // };

  return (
    <View>
      <Modal
        presentationStyle={(pageSheet = 1)}
        animationType={"slide"}
        transparent={true}
        visible={modalVisible}
        // onClose={onModalClose}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          //presentationStyle='pageSheet'
        }}
      >
        {/* <Pressable
              style={{marginHorizontal: '100%', marginVertical: '70%'}}
              onPress={() => setModalVisible(!modalVisible)}>
              
              </Pressable> */}
        <BlurView
          intensity={5}
          tint="light"
          style={styles.blurContainer}
        ></BlurView>
        {/* <Input
          onBlur={modalClose}

         /> */}
        <View style={[styles.modalView, styles.shadow, styles.blur]}>
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
          </View>
          <TextInput
            onChangeText={setPhoneNumber}
            style={styles.input}
            keyboardType="numeric"
            value={phone}
            placeholder="+7(9__)___-__-__"
            // onBlur={() => Keyboard.dismiss()}
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
            <Text style={[gStyle.textBtn, { fontSize: 15 }]}>Продолжить</Text>
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
        {/* <Pressable onPress={onClose}>
            
        </Pressable> */}
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
    // borderWidth: 1,
    width: "100%",
    height: "45%",
    //height: "100%",
    position: "absolute",
    bottom: 0,
    marginBottom: 0,
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
  blurContainer: {
    flex: 1,
    padding: 20,
    //margin: 16,
    textAlign: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 20,
  },
  input: {
    paddingHorizontal: "5%",
    backgroundColor: "rgba(211, 211, 211, 0.2)",
    borderRadius: 13,
    height: "12%",
    marginTop: "1%",
    fontSize: 14,
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
    fontSize: 15,
  },
});

export default Auth;
