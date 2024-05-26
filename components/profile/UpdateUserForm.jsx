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
import { gStyle } from "../../styles/style";
import { BlurView } from "expo-blur";
import { UserContext } from "../../hooks/useUser";
import UserService from "../../services/UserService";
import { COLORS } from "../../constants";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const UpdateUserForm = ({ user }) => {
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [dateModalVisible, setDateModalVisible] = useState(false);

  const [name, setName] = useState(undefined);
  const [phone, setPhone] = useState(undefined);
  const [mail, setMail] = useState(undefined);
  const [address, setAddress] = useState(undefined);
  const [birth, setBirth] = useState(undefined);
  const [role, setRole] = useState(undefined);

  useEffect(() => {
    setName(user?.name);
    setPhone(user?.phone);
    setMail(user?.mail);
    setAddress(user?.address);
    setBirth(user?.birth);

    setRole(user?.role);
  }, [user]);
  const userService = new UserService();

  // variables
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["65%"], []);

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
        disabled={user ? false : true}
        onPress={() => {
          setIsButtonPressed(!isButtonPressed);
          handlePresentModalPress();
          // await userService.updateUser(user.id, { name, phone, role });
        }}
        style={styles.updateBtn}
      >
        <View>
          <Text>
            {isButtonPressed ? (
              <FontAwesome6 name="pen-to-square" size={18} color="black" />
            ) : (
              <MaterialCommunityIcons
                name="pencil-off-outline"
                size={21}
                color="black"
              />
            )}
          </Text>
        </View>
      </TouchableOpacity>
      <BottomSheetModal
        enablePanDownToClose={false}
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={styles.shadow}
        bottomInset={0}
        backgroundStyle={{
          // backgroundColor: "rgb(243,154,83)",
          borderRadius: 20,
        }}
      >
        <BottomSheetView style={[styles.modalView, styles.blur]}>
          <View style={{ rowGap: 10 }}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 16, fontWeight: 600 }}>
                Настройки пользователя
              </Text>
            </View>
            <View style={styles.inputView}>
              <View style={styles.text}>
                <Text>Имя: </Text>
              </View>
              <BottomSheetTextInput
                placeholder={"Имя не указано"}
                onChangeText={setName}
                style={styles.textInput}
              >
                {name ? name : ""}
              </BottomSheetTextInput>
            </View>
            <View style={styles.inputView}>
              <View style={styles.text}>
                <Text>Телефон: </Text>
              </View>
              <BottomSheetTextInput
                placeholder={"Телефон не указан"}
                onChangeText={setPhone}
                readOnly={true}
                style={styles.textInput}
              >
                {phone ? phone : ""}
              </BottomSheetTextInput>
            </View>
            <View style={styles.inputView}>
              <View style={styles.text}>
                <Text>Почта: </Text>
              </View>
              <BottomSheetTextInput
                placeholder={"Почта не указана"}
                onChangeText={setMail}
                style={styles.textInput}
              >
                {mail ? mail : ""}
              </BottomSheetTextInput>
            </View>
            <View style={styles.inputView}>
              <View style={styles.text}>
                <Text>Адрес: </Text>
              </View>
              <BottomSheetTextInput
                placeholder={"Адрес не указан"}
                onChangeText={setAddress}
                style={styles.textInput}
              >
                {address ? address : ""}
              </BottomSheetTextInput>
            </View>
            <View style={styles.inputView}>
              <View style={styles.text}>
                <Text>Дата рождения: </Text>
              </View>
              <BottomSheetTextInput
                onPress={() => setDateModalVisible(true)}
                placeholder={"Дата рождения не указана"}
                onChangeText={setBirth}
                textContentType={"birthdateDay"}
                style={styles.textInput}
              >
                {birth ? birth : ""}
              </BottomSheetTextInput>
            </View>
            <DateTimePickerModal
              isVisible={dateModalVisible}
              mode="date"
              onConfirm={(date) => {
                setBirth(new Date(date).toLocaleDateString());
                setDateModalVisible(false);
              }}
              onCancel={() => setDateModalVisible(false)}
            />
            {/*<View style={styles.inputView}>*/}
            {/*  <View style={styles.text}>*/}
            {/*    <Text>Role: </Text>*/}
            {/*  </View>*/}
            {/*  <BottomSheetTextInput style={styles.textInput}>*/}
            {/*    {user?.phone ? `${role}` : "Роль рождения не указана"}*/}
            {/*  </BottomSheetTextInput>*/}
            {/*</View>*/}
            <TouchableOpacity
              onPress={async () => {
                await userService.updateUser(user.id, {
                  name,
                  phone,
                  mail,
                  address,
                  birth,
                  role,
                });
                handleDismissModalPress();
              }}
            >
              <View style={styles.button}>
                <Text>Готово</Text>
              </View>
            </TouchableOpacity>
          </View>
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
  inputView: { flexDirection: "column" },
  textInput: {
    // flex: 1,
    width: "100%",
    paddingVertical: 7,
    paddingHorizontal: 15,
    alignItems: "center",
    //justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
  },
  text: {
    // backgroundColor: "white",
    // flex: 1,
    // alignItems: "center",
    paddingLeft: 10,
    justifyContent: "center",
  },
  button: {
    marginTop: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    //justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "rgba(255, 140, 0, 0.6)",
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

export default UpdateUserForm;
