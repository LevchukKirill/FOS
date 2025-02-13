import React, { useContext, useState } from "react";
import SettingItem from "../../components/profile/settings/SettingItem";

import { Text, View, StyleSheet } from "react-native";
import UserService from "../../services/UserService";
import { UserContext } from "../../hooks/useUser";
import OrderService from "../../services/OrderService";
import { useActions } from "../../hooks/useActions";
import basket from "../../screens/Basket/Basket";
import { useSelector } from "react-redux";

const Settings = () => {
  const basket = useSelector((state) => state.basket);

  const { user, setUser } = useContext(UserContext);
  const [addresses, setAddresses] = useState(undefined);

  const { clearBasket } = useActions();

  function logout() {
    new UserService().logout().then(() => {
      setUser(undefined);
      clearBasket(undefined);
    });
  }

  function deleteUser() {
    new UserService().deleteUser(user.id).then(() => {
      clearBasket();
      setUser(undefined);
    });
  }

  function getUserOrdersDelivery() {
    new OrderService()
      .getAllOrderById("user", user.id)
      .then((response) => setAddresses(response.map((i) => i.address)));
  }

  return (
    <View style={styles.container}>
      <View style={styles.lineBig} />
      <View style={styles.sect1}>
        <SettingItem style={{ marginLeft: "10%" }} name={"История заказов"} />
      </View>
      <View style={styles.lineLittle} />
      <View style={styles.sect1}>
        <SettingItem
          style={styles.left}
          handler={getUserOrdersDelivery}
          disabled={!user?.id}
          name={"Адреса доставки"}
        />
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
    marginLeft: "5%",
  },
  sect2: {
    marginLeft: "5%",
  },
  delete: {
    marginTop: "4%",
    margin: "auto",
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
