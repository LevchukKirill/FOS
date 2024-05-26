import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import { COLORS } from "../../constants";
import UserService from "../../services/UserService";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import UpdateUserForm from "./UpdateUserForm";

const userService = new UserService();

const UserInfo = ({ user }) => {
  const [isButtonPressed, setIsButtonPressed] = useState(true);
  const [name, setName] = useState(undefined);
  const [phone, setPhone] = useState(undefined);
  const [role, setRole] = useState(undefined);

  useEffect(() => {
    setName(user?.name);
    setPhone(user?.phone);
    setRole(user?.role);
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <View style={styles.dataForm}>
          <View style={{ padding: 10 }}>
            <FontAwesome
              name="user-circle"
              size={70}
              color="black"
              style={{ marginLeft: "7%", marginTop: "3%" }}
            />
          </View>
          <View style={{ marginLeft: -30, flex: 0.7 }}>
            <Text style={styles.minitext}>Имя</Text>
            <TextInput
              // value={name}
              readOnly={isButtonPressed}
              style={[{ fontSize: 16, marginTop: "2%" }]}
            >
              {user?.name ? `${name}` : "Имя не указано"}
            </TextInput>
            <Text style={[styles.minitext, { marginTop: "7%" }]}>Телефон</Text>
            <TextInput
              // value={phone}
              readOnly={isButtonPressed}
              style={[{ fontSize: 16, marginTop: "2%" }]}
            >
              {user?.phone ? `${phone}` : "Телефон не указан"}
            </TextInput>
            {/*<Text style={styles.minitext}>Почта</Text>*/}
            {/*<TextInput*/}
            {/*  readOnly={isButtonPressed}*/}
            {/*  onChangeText={setRole}*/}
            {/*  style={[{ fontSize: 18 }]}*/}
            {/*>*/}
            {/*  {user?.role ? `${role}` : "mail не найдено"}*/}
            {/*</TextInput>*/}
          </View>
        </View>
        <View
          style={{
            borderWidth: 0,
            flexShrink: 1,
            padding: 15,
            width: 50,
            // paddingTop: 10,
          }}
        >
          <UpdateUserForm user={user} />
        </View>
      </View>
      <View style={styles.menuItem}>
        <Text style={styles.minitext}>Дата рождения</Text>
        <Text style={{ fontSize: 16, marginTop: "0.5%" }}>
          {user?.bday ? user.bday : "Дата рождения не указана"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    // paddingTop: 10,
    // marginBottom: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    marginTop: 10,
    justifyContent: "space-between",
  },
  block: {
    // borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    // columnGap: 140,
  },
  dataForm: {
    justifyContent: "space-between",
    marginTop: "5%",
    flexDirection: "row",
    // borderWidth: 1,

    flex: 1,
    // borderWidth: 1,
    // padding: 5,
  },
  menuItem: {
    width: "100%",
    padding: 5,
    paddingLeft: 15,
    // padding: 15,
  },
  minitext: {
    color: "rgba(128, 128, 128, 0.9)",
    fontSize: 14,
  },
  updateBtn: {
    alignItems: "center",
    //borderWidth: 1,
    //borderColor: COLORS.primary,
    width: 25,
    height: 25,
    //borderRadius: 50,
  },
});

export default UserInfo;
