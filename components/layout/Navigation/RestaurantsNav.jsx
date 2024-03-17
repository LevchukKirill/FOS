import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ElladaScreen from "../../restaurants/Restaraunts";
import SindbadScreen from "../../restaurants/Restaraunts";
import ShtolenhofScreen from "../../restaurants/Restaraunts";

const TopTab = createMaterialTopTabNavigator();

function RestaurantsNav() {
  return (
    <TopTab.Navigator screenOptions={{ tabBarStyle: { borderWidth: 1 } }}>
      <TopTab.Screen name="rest1" component={ElladaScreen} />
      <TopTab.Screen name="rest2" component={SindbadScreen} />
      <TopTab.Screen name="rest3" component={ShtolenhofScreen} />
    </TopTab.Navigator>
  );
}

export default RestaurantsNav;
