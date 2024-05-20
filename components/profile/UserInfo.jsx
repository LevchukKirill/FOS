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

// import { HandySvg } from "handy-svg";
// import iconUser from "./user.svg";

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
          {/* <HandySvg src={iconUser}  width="32" height="32" /> */}
          <FontAwesome
            name="user-circle"
            size={70}
            color="black"
            style={{ marginLeft: "7%", marginTop: "3%" }}
          />
          <View style={{ marginLeft: -30 }}>
            <Text style={styles.minitext}>Имя</Text>
            <TextInput
              // value={name}
              onChangeText={setName}
              readOnly={isButtonPressed}
              style={[{ fontSize: 16, marginTop: "2%" }]}
            >
              {user?.name ? `${name}` : "Имя не указано"}
            </TextInput>
            <Text style={[styles.minitext, { marginTop: "7%" }]}>Телефон</Text>
            <TextInput
              // value={phone}
              onChangeText={setPhone}
              readOnly={isButtonPressed}
              style={[{ fontSize: 16, marginTop: "2%" }]}
            >
              {user?.phone ? `${phone}` : "Телефон не указан"}
            </TextInput>
            {/* <Text style={styles.minitext}>Почта</Text> */}
            {/* <TextInput
              readOnly={isButtonPressed}
              onChangeText={setRole}
              style={[{ fontSize: 18 }]}
            >
              {user?.role ? `${role}` : "mail не найдено"}
            </TextInput> */}
          </View>

          <TouchableOpacity
            disabled={user ? false : true}
            onPress={async () => {
              setIsButtonPressed(!isButtonPressed);
              await userService.updateUser(user.id, { name, phone, role });
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
  dataForm: {
    marginTop: "5%",
    flexDirection: "row",
    // borderWidth: 1,
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
