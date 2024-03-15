import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../../../screens/Home/Home.jsx";
import Busket from "../../../screens/Busket/Busket.jsx";
import Profile from "../../../screens/Profile/Profile.jsx";
import Icon from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();
ell;
const homeName = "Home";
const busketName = "Busket";
const profileName = "Profile";

const BottomNav = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;

            if (route.name === homeName) {
              iconName = focused ? "home" : "home-outline";
            }

            return <Icon name={iconName} size={24} color={color} />;
          },
        })}
      >
        <Tab.Screen name={homeName} component={Home} />
        <Tab.Screen name={busketName} component={Busket} />
        <Tab.Screen name={profileName} component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomNav;
