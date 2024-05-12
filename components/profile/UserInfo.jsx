import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import { COLORS } from "../../constants";
import UserService from "../../services/UserService";

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
        <Icon style={styles.icon} name={"user"} size={100} />
        <View style={styles.dataForm}>
          <View style={{ alignContent: "center" }}>
            <TextInput
              // value={name}
              onChangeText={setName}
              readOnly={isButtonPressed}
              style={{ fontSize: 18 }}
            >
              {user?.name ? `${name}` : "Имя не найдено"}
            </TextInput>
            <TextInput
              // value={phone}
              onChangeText={setPhone}
              readOnly={isButtonPressed}
              style={{ fontSize: 18 }}
            >
              {user?.phone ? `${phone}` : "phone не найдено"}
            </TextInput>
            <TextInput
              readOnly={isButtonPressed}
              onChangeText={setRole}
              style={{ fontSize: 18 }}
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
        <Text>{user?.bday ? user.bday : "День рождения не указан"}</Text>
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
    columnGap: 10,
  },
  icon: { borderWidth: 1, borderColor: COLORS.primary, borderRadius: 10 },
  dataForm: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
    padding: 5,
  },
  menuItem: {
    width: "100%",
    borderWidth: 1,
    padding: 5,
    borderColor: COLORS.primary,
    borderRadius: 10,
  },
  updateBtn: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.primary,
    width: 25,
    height: 25,
    borderRadius: 50,
  },
});

export default UserInfo;
