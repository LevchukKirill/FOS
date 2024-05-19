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
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

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
    <TypeContext.Provider value={[types, setTypes]}>
      <ActiveTypeContext.Provider value={[activeType, setActiveType]}>
        {restaurants ? (
          <TopTab.Navigator
            screenOptions={{ tabBarStyle: { borderWidth: 0 } }}
            initialRouteName={"sindbad"}
          >
            {restaurants?.map((item) => {
              const Tab = restaurantComponents[item.type];
              // console.log(Tab, item.type);
              return (
                <TopTab.Screen
                  name={item.name}
                  key={item.id}
                  children={() => (
                    <Tab
                      transport={transport}
                      connected={isConnected}
                      foods={activeFoods}
                      type={types}
                      restaurantId={item.id}
                    />
                  )}
                />
              );
            })}
          </TopTab.Navigator>
        ) : (
          <Text>Загрузка...</Text>
        )}
      </ActiveTypeContext.Provider>
    </TypeContext.Provider>
  );
}

export default RestaurantsNav;
