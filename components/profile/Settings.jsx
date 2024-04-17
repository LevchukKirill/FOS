import React from "react";
import SettingItem from "../../components/profile/settings/SettingItem";

import { Text, View, StyleSheet } from "react-native";

const Settings = () => {
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
      <SettingItem name={"Выйти из аккаунта"} />
      <SettingItem name={"Удалить аккаунт"} />
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
