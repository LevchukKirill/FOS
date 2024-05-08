import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ElladaScreen from "../../restaurants/ElladaScreen";
import SindbadScreen from "../../restaurants/SindbadScreen";
import ShtolenhofScreen from "../../restaurants/ShtolenhofScreen";
import { COLORS } from "../../../constants";
import { Text } from "react-native";
import { useEffect, useState } from "react";
import FoodService from "../../../services/FoodService";
import TypeService from "../../../services/TypeService";
import { TypeContext } from "../../../hooks/useCategories";
import { ActiveTypeContext } from "../../../hooks/useActiveType";
import { RestaurantsService } from "../../../services/RestaurantsService";

const restaurantsService = new RestaurantsService();

const foodService = new FoodService();
const typeService = new TypeService();

function RestaurantsNav() {
  const [types, setTypes] = useState([]);
  const [activeType, setActiveType] = useState(undefined);
  const [activeFoods, setActiveFoods] = useState([]);
  const [restaurants, setRestaurants] = useState(undefined);

  useEffect(() => {
    typeService.getAllTypes().then((r) => {
      setTypes(r);
      setActiveType(r[0]);
    });
    restaurantsService.getAllRestaurants().then((r) => {
      // console.log(r);
      setRestaurants(r);
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

  const restaurantComponents = {
    pizza: SindbadScreen,
    "pizza-reversed": ElladaScreen,
    coffee: ShtolenhofScreen,
  };

  return (
    <ActiveTypeContext.Provider value={[activeType, setActiveType]}>
      <TypeContext.Provider value={[types, setTypes]}>
        {restaurants ? (
          <TopTab.Navigator
            screenOptions={{ tabBarStyle: { borderWidth: 0 } }}
            initialRouteName={"sindbad"}
          >
            {restaurants?.map((item) => {
              const Component = restaurantComponents[item.type];
              // console.log(Component);
              return (
                <TopTab.Screen
                  name={item.name}
                  key={item.id}
                  children={() => (
                    <Component foods={activeFoods} type={types} />
                  )}
                />
              );
            })}
          </TopTab.Navigator>
        ) : (
          <Text>Загрузка...</Text>
        )}
      </TypeContext.Provider>
    </ActiveTypeContext.Provider>
  );
}

export default RestaurantsNav;
