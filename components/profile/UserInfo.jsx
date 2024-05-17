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
import { FontAwesome6 } from "@expo/vector-icons";
import IconUser from "./user.svg";

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

  // console.log(user, user.name, phone, role);
  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <View style={styles.dataForm}>
          <FontAwesome6
            name="user-circle"
            size={70}
            color="black"
            style={{ marginLeft: "7%" }}
          />
          <View style={{ alignContent: "center" }}>
            <Text style={styles.minitext}>Имя</Text>
            <TextInput
              // value={name}
              onChangeText={setName}
              readOnly={isButtonPressed}
              style={[{ fontSize: 16, marginTop: "1%" }]}
            >
              {user?.name ? `${name}` : "Имя не найдено"}
            </TextInput>
            <Text style={[styles.minitext, { marginTop: "6%" }]}>Телефон</Text>
            <TextInput
              // value={phone}
              onChangeText={setPhone}
              readOnly={isButtonPressed}
              style={[{ fontSize: 16, marginTop: "1%" }]}
            >
              {user?.phone ? `${phone}` : "phone не найдено"}
            </TextInput>
            <Text style={styles.minitext}>Почта</Text>
            <TextInput
              readOnly={isButtonPressed}
              onChangeText={setRole}
              style={[{ fontSize: 18 }]}
            >
              {user?.role ? `${role}` : "mail не найдено"}
            </TextInput>
          </View>

          <TouchableOpacity
            disabled={user ? false : true}
            onPress={async () => {
              setIsButtonPressed(!isButtonPressed);
              await userService.updateUser(user.id, { name, phone, role });
              //TODO: хеширование запроса на изм user`а
            }}
            style={styles.updateBtn}
          >
            <View>
              <Text>{isButtonPressed ? "+" : "-"}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.menuItem}>
        <Text style={styles.minitext}>Дата рождения</Text>
        <Text style={{ fontSize: 16, marginTop: "1%" }}>
          {user?.bday ? user.bday : "Дата рождения не указана"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    rowGap: 5,
    height: "100%",
    padding: 10,
    justifyContent: "space-between",
  },
  block: {
    display: "flex",
    flexDirection: "row",
    columnGap: 140,
  },
  icon: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
  },
  dataForm: {
    marginTop: "5%",
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
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
