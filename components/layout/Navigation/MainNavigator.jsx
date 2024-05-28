import React, { createContext, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../../../screens/Home/Home.jsx";
import Basket from "../../../screens/Basket/Basket.jsx";
import Profile from "../../../screens/Profile/Profile.jsx";
import { Feather } from "@expo/vector-icons";
//import Icon from "react-native-vector-icons/Feather";
import { COLORS } from "../../../constants";
import { StyleSheet } from "react-native";
import RestaurantsNav from "./RestaurantsNav";

const Tab = createBottomTabNavigator();

const homeName = "Меню";
const basketName = "Корзина";
const profileName = "Профиль";

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarStyle: styles.tabBar,
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;

            if (route.name === homeName) {
              iconName = "home";
            } else if (route.name === basketName) {
              iconName = "shopping-cart";
            } else if (route.name === profileName) {
              iconName = "user";
            }
            return <Feather name={iconName} size={28} color={color} />;
          },
        })}
      >
        <Tab.Screen name={homeName} component={RestaurantsNav} />
        <Tab.Screen name={basketName} component={Basket} />
        <Tab.Screen name={profileName} component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
  },
});
export default MainNavigator;
