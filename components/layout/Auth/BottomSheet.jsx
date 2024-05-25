import React, {
  useMemo,
  useRef,
  useCallback,
  useState,
  useEffect,
  useContext,
} from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Pressable,
} from "react-native";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { gStyle } from "../../../styles/style";
import { BlurView } from "expo-blur";
import { UserContext } from "../../../hooks/useUser";
import UserService from "../../../services/UserService";
import { COLORS } from "../../../constants";

const ModalSheet = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhoneNumber] = useState("+79618634799");
  const [password, setPassword] = useState("qwerty12");

  const [error, setError] = useState(undefined);
  const { setUser } = useContext(UserContext);

  const userService = new UserService();

  // variables
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["45%", "45%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);
  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  // renders
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={gStyle.button}
        onPress={handlePresentModalPress}
        // title="Present Modal"
        // color="black"
      >
        <Text style={gStyle.textBtn}>Войти</Text>
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={styles.shadow}
        backgroundStyle={{
          // backgroundColor: COLORS.lightGray1,
          borderRadius: 20,
        }}
      >
        <BottomSheetView style={[styles.modalView, styles.blur]}>
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
          <BottomSheetTextInput
            onChangeText={setPhoneNumber}
            style={[styles.input, { height: "11.5%" }]}
            keyboardType="numeric"
            value={phone}
            placeholder="+7(9__)___-__-__"
            // onBlur={() => Keyboard.dismiss()} ////////////////////////////////////////////////
            //static dismiss();
          />
          <BottomSheetTextInput
            onChangeText={setPassword}
            style={[styles.input, { height: "11.5%" }]}
            secureTextEntry={true}
            value={password}
            placeholder="Пароль"
            // onBlur={() => Keyboard.dismiss()}
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
                  userService.auth().then(setUser);
                  handleDismissModalPress();
                })
                .catch(setError);
            }}
          >
            <Text style={[gStyle.textBtn, { fontSize: 15 }]}>Продолжить</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              console.log(1);
              setIsLogin(!isLogin);
            }}
          >
            <Text style={[styles.anotherBtn, { marginTop: "3%" }]}>
              {isLogin ? "Зарегистрироваться" : "Войти в аккаунт"}
            </Text>
          </Pressable>
          {/*</View>*/}
          {/*</BlurView>*/}
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexGrow: 1,
    // padding: 24,
    width: "100%",
    // height: "100%",
    // borderWidth: 1,
    justifyContent: "center",
    // backgroundColor: "grey",
  },
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
    position: "absolute",
    // borderWidth: 1,
    width: "100%",
    height: "100%",
    paddingHorizontal: 30,
    // flex: 1,
    rowGap: 5,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    borderRadius: 20,
    elevation: 8,
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

export default ModalSheet;
