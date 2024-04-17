import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import { COLORS } from "../../constants";

const UserInfo = ({ user }) => {
  console.log({ user });
  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <Icon style={styles.icon} name={"user"} size={100} />
        <View style={styles.dataForm}>
          <View style={{ alignContent: "center" }}>
            <Text style={{ fontSize: 18 }}>
              {user.name ? `${user.name}` : "Имя не найдено"}
            </Text>
            <Text style={{ fontSize: 18 }}>
              {user.phone ? `${user.phone}` : "phone не найдено"}
            </Text>
            <Text style={{ fontSize: 18 }}>
              {user.mail ? `${user.mail}` : "mail не найдено"}
            </Text>
          </View>
          <TouchableOpacity style={styles.updateBtn}>
            <View>
              <Text>+</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.menuItem}>
        <Text>{"{Дата рождения}"}</Text>
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
