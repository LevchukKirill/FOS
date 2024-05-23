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
  const [activeFoods, setActiveFoods] = useState([]);
  const [restaurants, setRestaurants] = useState(undefined);

  const [swipeEnabled, setSwipeEnabled] = useState(true);

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
      // TODO: СМС-оповещения (auth through sms-code)
      // TODO: Настроить отправку уведомлений определенным пользователям
      // TODO: Настроить сервис оплаты
      // TODO: Пагинация (генерация позиций меню (максимум 6 позиций в столе))
      // TODO: Чат поддержки
      // TODO: Стили
      // TODO: Запрос на получение адресов доставки
      // TODO: Разделение заказов по категориям
      // TODO: Запрос разделяющий еду по ресторанам
      // TODO: Обнуление состояния стола(после смены ресторана) и корзины(после смены пользователя)
      // TODO: Красивые поля редактирования пользователя
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
        <SwipeEnabledContext.Provider value={{ swipeEnabled, setSwipeEnabled }}>
          {restaurants ? (
            <TopTab.Navigator
              screenOptions={{
                tabBarStyle: { borderWidth: 0 },
                swipeEnabled,
                tabBarActiveTintColor: "#000",
                tabBarLabelStyle: {
                  textTransform: "capitalize",
                },
                // tabBarGap: 10,
                tabBarIndicatorStyle: {
                  backgroundColor: COLORS.black,
                  height: 2,
                  // width: "20%",
                },
              }}
              initialRouteName={"sindbad"}
            >
              {restaurants?.map((item) => {
                const Tab = restaurantComponents[item.type];
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
    </TypeContext.Provider>
  );
}

export default RestaurantsNav;
