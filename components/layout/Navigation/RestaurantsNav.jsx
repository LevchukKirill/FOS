import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ElladaScreen from "../../restaurants/ElladaScreen";
import SindbadScreen from "../../restaurants/SindbadScreen";
import ShtolenhofScreen from "../../restaurants/ShtolenhofScreen";
import { COLORS } from "../../../constants";
import { useEffect, useState } from "react";
import FoodService from "../../../services/FoodService";
import TypeService from "../../../services/TypeService";
import { TypeContext } from "../../../hooks/useCategories";
import { ActiveTypeContext } from "../../../hooks/useActiveType";

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
  }, []);

  useEffect(() => {
    if (!activeType) return () => {};
    if (!activeType.foods) {
      // console.log(`${activeType.id} активити тайп айди`);
      foodService.getFoodByType(activeType.id).then((res) => {
        activeType.foods = res;
        // console.log(activeType + "жто тут");
        setActiveFoods(activeType.foods);
      });
    } else {
      setActiveFoods(activeType.foods);
    }
  }, [activeType]);

  const TopTab = createMaterialTopTabNavigator();

  return (
    <ActiveTypeContext.Provider value={[activeType, setActiveType]}>
      <TypeContext.Provider value={[types, setTypes]}>
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
      </TypeContext.Provider>
    </ActiveTypeContext.Provider>
  );
}

export default RestaurantsNav;
