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
import { ActiveRestaurantContext } from "../../../hooks/useActiveRestaurant";
import { SwipeEnabledContext } from "../../../hooks/useNavigation";
import { RestaurantsService } from "../../../services/RestaurantsService";

const restaurantsService = new RestaurantsService();

const foodService = new FoodService();
const typeService = new TypeService();

function RestaurantsNav() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  const [types, setTypes] = useState([]);
  const [activeType, setActiveType] = useState(undefined);
  const [restaurants, setRestaurants] = useState(undefined);
  const [activeRestaurant, setActiveRestaurant] = useState(undefined);
  const [activeFoods, setActiveFoods] = useState([]);

  const [swipeEnabled, setSwipeEnabled] = useState(true);

  useEffect(() => {
    typeService.getAllTypes().then((r) => {
      setTypes(r);
      setActiveType(r[0]);
    });
    restaurantsService.getAllRestaurants().then((r) => {
      setRestaurants(r);
      setActiveRestaurant(r[0]);
      // console.log(r[0]);
    });
  }, []);

  useEffect(() => {
    // console.log(activeRestaurant?.id, activeType?.id);

    // console.log(activeType.id, activeRestaurant);

    foodService.getAllFood(activeType?.id, activeRestaurant?.id).then((res) => {
      setActiveFoods([]);
      setActiveFoods(res.rows);
      // console.log(res.rows.map((i) => i));
    });
  }, [activeType, activeRestaurant]);

  useEffect(() => {
    setActiveType(types[0]);
  }, [activeRestaurant]);

  // TODO: Загрузить приложение
  // TODO: СМС-оповещения (auth through sms-code)
  // TODO: Фокус на локацию
  //
  // TODO: Стили
  // TODO: Настроить сервис оплаты
  // TODO: Настроить отправку уведомлений определенным пользователям
  // TODO: Чат поддержки

  const TopTab = createMaterialTopTabNavigator();

  const restaurantComponents = {
    pizza: SindbadScreen,
    coffee: ShtolenhofScreen,
    "pizza-reversed": ElladaScreen,
  };

  return (
    <TypeContext.Provider value={[types, setTypes]}>
      <ActiveRestaurantContext.Provider
        value={[activeRestaurant, setActiveRestaurant]}
      >
        <ActiveTypeContext.Provider value={[activeType, setActiveType]}>
          <SwipeEnabledContext.Provider
            value={{ swipeEnabled, setSwipeEnabled }}
          >
            {restaurants ? (
              <TopTab.Navigator
                screenOptions={{
                  tabBarStyle: { borderWidth: 0 },
                  swipeEnabled,
                  tabBarActiveTintColor: "#000",
                  tabBarLabelStyle: {
                    textTransform: "capitalize",
                  },
                  tabBarIndicatorStyle: {
                    backgroundColor: COLORS.black,
                    height: 2,
                  },
                }}
                initialRouteName={"sindbad"}
              >
                {restaurants?.map((item) => {
                  const Screen = restaurantComponents[item.type];
                  return (
                    <TopTab.Screen
                      name={item.name}
                      key={item.id}
                      children={() => (
                        <Screen
                          restaurant={item}
                          transport={transport}
                          connected={isConnected}
                          foods={activeFoods}
                          activeType={activeType?.id}
                          type={types}
                          restaurantId={item.id}
                          address={item.address}
                        />
                      )}
                    />
                  );
                })}
              </TopTab.Navigator>
            ) : (
              <Text>Загрузка...</Text>
            )}
          </SwipeEnabledContext.Provider>
        </ActiveTypeContext.Provider>
      </ActiveRestaurantContext.Provider>
    </TypeContext.Provider>
  );
}

export default RestaurantsNav;
