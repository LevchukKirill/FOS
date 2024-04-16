import React from "react";
import SettingItem from "../../components/profile/settings/SettingItem";

import { Text, View, StyleSheet } from "react-native";

const Settings = () => {
  return (
    <View>
      <View>
        <SettingItem name={"История заказов"} />
        <SettingItem name={"Адреса"} />
      </View>
      <View>
        <SettingItem name={"Поддержка"} />
        <SettingItem name={"Контакты"} />
      </View>
      <SettingItem name={"Тема"} />
      <SettingItem name={"Выйти из аккаунта"} />
      <SettingItem name={"Удалить аккаунт"} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Settings;
