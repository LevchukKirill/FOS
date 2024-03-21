import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ElladaScreen from "../../restaurants/ElladaScreen";
import SindbadScreen from "../../restaurants/SindbadScreen";
import ShtolenhofScreen from "../../restaurants/ShtolenhofScreen";
import { COLORS } from "../../../constants";

const TopTab = createMaterialTopTabNavigator();

function RestaurantsNav() {
  return (
    <TopTab.Navigator screenOptions={{ tabBarStyle: { borderWidth: 0 } }}>
      <TopTab.Screen
        style={{ backgroundColor: COLORS.black }}
        name="ellada"
        component={ElladaScreen}
      />
      <TopTab.Screen name="sindbad" component={SindbadScreen} />
      <TopTab.Screen name="shtolenhof" component={ShtolenhofScreen} />
    </TopTab.Navigator>
  );
}

export default RestaurantsNav;
