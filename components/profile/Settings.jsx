import React, { useContext } from "react";
import SettingItem from "../../components/profile/settings/SettingItem";

import { Text, View, StyleSheet } from "react-native";
import UserService from "../../services/UserService";
import { UserContext } from "../../hooks/useUser";

const Settings = () => {
  const { user, setUser } = useContext(UserContext);
  function logout() {
    new UserService().logout().then(() => {
      setUser(undefined);
    });
  }

  function deleteUser() {
    new UserService().deleteUser(user.id).then(() => {
      setUser(undefined);
    });
    //TODO: Протестировать
  }
  return (
    <View style={styles.container}>
      <View style={styles.lineBig} />
      <View style={styles.sect1}>
        <SettingItem style={{ marginLeft: "10%" }} name={"История заказов"} />
      </View>
      <View style={styles.lineLittle} />
      <View style={styles.sect1}>
        <SettingItem style={styles.left} name={"Адреса доставки"} />
      </View>
      <View style={styles.lineBig} />
      <View style={styles.sect2}>
        <SettingItem name={"Служба поддержки"} />
      </View>
      <View style={styles.lineLittle} />
      <View style={styles.sect2}>
        <SettingItem name={"Контакты"} />
      </View>
      <View style={styles.lineBig} />
      <View style={[styles.section, styles.sect2]}>
        <SettingItem name={"Темная тема"} />
      </View>
      <View style={styles.lineBig} />
      <View style={[styles.section, styles.sect2]}>
        <SettingItem handler={logout} name={"Выйти из профиля"} />
      </View>
      <View style={styles.lineBig} />
      <View style={styles.delete}>
        <SettingItem red={true} handler={deleteUser} name={"Удалить аккаунт"} />
      </View>

      {/* <SettingItem handler={deleteUser}  >
        <Text style={styles.delete}>Удалить аккаунт</Text>
        
        </SettingItem> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    // marginTop: "3%",
    height: "100%",
    // paddingHorizontal: 20,
    //paddingVertical: 5,
    display: "flex",
    flexDirection: "column",
    rowGap: 5,
  },
  section: {
    // rowGap: 1,
    // marginLeft: "5%",
    // marginRight: "5%",
  },
  sect1: {
    // marginTop: "%",
    marginLeft: "5%",
  },
  sect2: {
    // marginTop: "%",
    marginLeft: "5%",
  },
  delete: {
    margin: "auto",
    marginTop: "4%",
    // justifyContent: "center",
    // marginLeft: "35%",
    color: "red",

    //alignContent: 'center'
    //borderWidth: 1
  },
  lineBig: {
    // marginTop: "%",
    width: "100%",
    height: "4%",
    backgroundColor: "rgba(220, 220, 220, 0.3)",
  },
  lineLittle: {
    // marginTop: "%",
    width: "100%",
    height: "0.3%",
    backgroundColor: "rgba(220, 220, 220, 0.3)",
  },
});

export default Settings;
