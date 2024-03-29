import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ElladaScreen from "../../restaurants/ElladaScreen";
import SindbadScreen from "../../restaurants/SindbadScreen";
import ShtolenhofScreen from "../../restaurants/ShtolenhofScreen";
import { COLORS } from "../../../constants";
import { useEffect, useState } from "react";
import FoodService from "../../../services/FoodService";
import TypeService from "../../../services/TypeService";

const foodService = new FoodService();
const typeService = new TypeService();

function RestaurantsNav() {
  const [allFood, setAllFood] = useState([]);
  const [types, setTypes] = useState([]);

  const fetchFoodData = async () => {
    return await foodService.getAllFood();
  };
  const fetchTypeData = async () => {
    return await typeService.getAllTypes();
  };

  useEffect(() => {
    fetchFoodData().then((r) => setAllFood(r));
    fetchTypeData().then((r) => setTypes(r));
  }, []);

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
        {(props) => <SindbadScreen {...props} foods={allFood} type={types} />}
      </TopTab.Screen>
      {/*// name="sindbad" // component={SindbadScreen}*/}
      {/*// initialParams={{ data: allFood }}*/}
      <TopTab.Screen name="shtolenhof" component={ShtolenhofScreen} />
    </TopTab.Navigator>
  );
}

export default RestaurantsNav;
