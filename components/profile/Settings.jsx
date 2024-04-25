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
      <View style={styles.section}>
        <SettingItem name={"История заказов"} />
        <SettingItem name={"Адреса"} />
      </View>
      <View style={styles.section}>
        <SettingItem name={"Поддержка"} />
        <SettingItem name={"Контакты"} />
      </View>
      <SettingItem name={"Тема"} />
      <SettingItem handler={logout} name={"Выйти из аккаунта"} />
      <SettingItem handler={deleteUser} name={"Удалить аккаунт"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    display: "flex",
    flexDirection: "column",
    rowGap: 5,
  },
  section: {
    rowGap: 1,
  },
});

export default Settings;
