import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ElladaScreen from "../../restaurants/ElladaScreen";
import SindbadScreen from "../../restaurants/SindbadScreen";
import ShtolenhofScreen from "../../restaurants/ShtolenhofScreen";

const TopTab = createMaterialTopTabNavigator();

function RestaurantsNav() {
  return (
    <TopTab.Navigator screenOptions={{ tabBarStyle: { borderWidth: 0 } }}>
      <TopTab.Screen name="rest1" component={ElladaScreen} />
      <TopTab.Screen name="rest2" component={SindbadScreen} />
      <TopTab.Screen name="rest3" component={ShtolenhofScreen} />
    </TopTab.Navigator>
  );
}

export default RestaurantsNav;
