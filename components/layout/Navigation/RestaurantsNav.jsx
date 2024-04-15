import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ElladaScreen from "../../restaurants/ElladaScreen";
import SindbadScreen from "../../restaurants/SindbadScreen";
import ShtolenhofScreen from "../../restaurants/ShtolenhofScreen";
import { COLORS } from "../../../constants";
import React, { useEffect, useState } from "react";
import FoodService from "../../../services/FoodService";
import TypeService from "../../../services/TypeService";

const foodService = new FoodService();
const typeService = new TypeService();

function RestaurantsNav() {
  const [types, setTypes] = useState([]);
  const [activeType, setActiveType] = useState(undefined);
  const [activeFoods, setActiveFoods] = useState([]);

  useEffect(() => {
    typeService.getAllTypes().then((r) => {
      setTypes(r);
      setActiveType(r[0]);
    });
  }, [types]);

  useEffect(() => {
    if (!activeType) return () => {};
    if (!activeType.foods)
      foodService.getFoodByType(activeType.id).then((res) => {
        activeType.foods = res;
        setActiveFoods(activeType.foods);
      });
    else {
      setActiveFoods(activeType.foods);
    }
  }, [activeType]);

  const TopTab = createMaterialTopTabNavigator();

  return (
    <TopTab.Navigator
      screenOptions={{ tabBarStyle: { borderWidth: 0 } }}
      initialRouteName={"sindbad"}
    >
      <TopTab.Screen
        style={{ backgroundColor: COLORS.black }}
        name="ellada"
        component={ElladaScreen}
      />
      <TopTab.Screen name="sindbad">
        {(props) => (
          <SindbadScreen {...props} foods={activeFoods} type={types} />
        )}
      </TopTab.Screen>
      <TopTab.Screen name="shtolenhof" component={ShtolenhofScreen} />
    </TopTab.Navigator>
  );
}

export default RestaurantsNav;
