import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";

import MapView, { Marker } from "react-native-maps";
// import Geolocation from "@react-native-community/geolocation";
import * as Location from "expo-location";
// import SearchAddress from "./SearchAddress";
import { UserGateway } from "../../services/UserGateway";
import { UserContext } from "../../hooks/useUser";

const { height } = Dimensions.get("window");

const CARD_HEIGHT = height / 6 - 100;
const CARD_WIDTH = CARD_HEIGHT + 50;

const Map = () => {
  const [courierLocations, setCourierLocations] = useState({});
  const [userInfo, setUserInfo] = useState(undefined);

  const userGateway = new UserGateway();
  const { user } = useContext(UserContext);
  // Location.getCurrentPositionAsync((position) => {
  //   let lat = parseFloat(position.coords.latitude);
  //   let long = parseFloat(position.coords.longitude);
  //   setMyPos({ latitude: lat, longitude: long });
  // });

  useEffect(() => {
    //join room (user id)
    console.log(userGateway.socket.connected);
    if (userGateway.socket.connected) {
      console.log("Подключился в комнату карты");
    }

    function onConnect() {
      console.log("connected location");
    }
    function onDisconnected() {
      console.log("disconnected");
    }
    function onUpdateLocation(location, userId) {
      console.log("new location", userId, location);
      setCourierLocations((locations) => ({
        ...locations,
        [userId]: location,
      }));
    }

    // function onChangeOrder(order) {
    //   console.log("change order status", order);
    //   setOrders((orders) => {
    //     const localOrder = orders.find((item) => item.id === order.id);
    //     if (!localOrder) {
    //       return [...orders, localOrder];
    //     }
    //     Object.assign(localOrder, order);
    //
    //     return orders.slice();
    //   });
    // }

    userGateway.socket.on("connect", onConnect);
    userGateway.socket.on("disconnect", onDisconnected);
    userGateway.socket.on("update:location", onUpdateLocation);

    return () => {
      userGateway.socket.off("disconnect", onDisconnected);
      userGateway.socket.off("connect", onConnect);
      userGateway.socket.off("update:location", onUpdateLocation);
    };
  }, []);

  const state = {
    markers: [
      {
        coordinate: {
          //54.635191, 21.815640
          latitude: 54.635191,
          longitude: 21.81564,
        },
        title: "Эллада",
        description: "Пиццерия",
        // image: Images[0],
      },
      {
        coordinate: {
          //54.636281, 21.802056
          latitude: 54.636281,
          longitude: 21.802056,
        },
        title: "Синдбад",
        description: "Пиццерия",
        // image: Images[1],
      },
      {
        coordinate: {
          //54.635287, 21.809613
          latitude: 54.635287,
          longitude: 21.809613,
        },
        title: "Shtolenhof",
        description: "Кофейня",
        // image: Images[2],
      },
    ],
    region: {
      //54.630706, 21.819503
      latitude: 54.630706,
      longitude: 21.819503,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };

  // componentWillMount();
  // {
  let currentIndex = 0;
  const animation = new Animated.Value(0);
  // }

  // We should detect when scrolling has stopped then animate
  // We should just debounce the event listener here
  animation.addListener(({ value }) => {
    let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
    if (index >= state.markers.length) {
      index = state.markers.length - 1;
    }
    if (index <= 0) {
      index = 0;
    }
    // const regionTimeout = setTimeout(() => {
    //   if (currentIndex !== index) {
    //     currentIndex = index;
    //     console.log(currentIndex);
    //     const { coordinate } = state.markers[index];
    //     state.region.setValue(
    //       {
    //         ...coordinate,
    //         latitudeDelta: state.region.latitudeDelta,
    //         longitudeDelta: state.region.longitudeDelta,
    //       },
    //       350,
    //     );
    //   }
    // }, 10);
    // clearTimeout(regionTimeout);
  });

  const interpolations = state.markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];
    const scale = animation.interpolate({
      inputRange,
      outputRange: [1, 2.5, 1],
      extrapolate: "clamp",
    });
    const opacity = animation.interpolate({
      inputRange,
      outputRange: [0.35, 1, 0.35],
      extrapolate: "clamp",
    });
    return { scale, opacity };
  });

  // function onRegionChange(region) {
  //   setLocation(region);
  //   return region;
  // }

  return (
    <View style={styles.container}>
      <MapView
        // onRegionChange={onRegionChange}
        // region={location?.coords}
        // ref={(map) => (state.region = map)}
        // initialRegion={state.region}
        style={styles.container}
      >
        {state.markers.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          const opacityStyle = {
            opacity: interpolations[index].opacity,
          };
          return (
            <Marker key={index} coordinate={marker.coordinate}>
              <Animated.View style={[styles.markerWrap, opacityStyle]}>
                <Animated.View style={[styles.ring, scaleStyle]} />
                <View style={styles.marker} />
              </Animated.View>
            </Marker>
          );
        })}
        {Object.entries(courierLocations)
          .filter(([_, location]) => location)
          .map(([userId, location]) => (
            <Marker coordinate={location.coords} key={userId}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.View style={[styles.ring]} />
                <View style={styles.marker} />
              </Animated.View>
            </Marker>
          ))}
      </MapView>
      {/*<ScrollView>*/}
      {/*{Object.entries(courierLocations)*/}
      {/*  .filter(([_, location]) => location)*/}
      {/*  .map(([userId, location]) => (*/}
      {/*    <View>*/}
      {/*      <Text>*/}
      {/*        {userId}: {JSON.stringify(location)}*/}
      {/*      </Text>*/}
      {/*    </View>*/}
      {/*    // <Marker coordinate={location.coords} key={userId}>*/}
      {/*    //   <Animated.View style={[styles.markerWrap]}>*/}
      {/*    //     <Animated.View style={[styles.ring]} />*/}
      {/*    //     <View style={styles.marker} />*/}
      {/*    //   </Animated.View>*/}
      {/*    // </Marker>*/}
      {/*  ))}*/}
      {/*</ScrollView>*/}
      <Animated.ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH - 50}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: animation,
                },
              },
            },
          ],
          { useNativeDriver: true },
        )}
        style={styles.scrollView}
        contentContainerStyle={styles.endPadding}
      >
        {state.markers.map((marker, index) => (
          <View style={styles.card} key={index}>
            {/*<Image*/}
            {/*  source={marker.image}*/}
            {/*  style={styles.cardImage}*/}
            {/*  resizeMode="cover"*/}
            {/*/>*/}
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>
                {marker.title}
              </Text>
              <Text numberOfLines={1} style={styles.cardDescription}>
                {marker.description}
              </Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: "1/1",
    flex: 1,
  },
  scrollView: {
    // borderWidth: 1,
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: CARD_WIDTH * 3,
  },
  card: {
    padding: 5,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    // overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
});

// AppRegistry.registerComponent("mapfocus", () => screens);
export default Map;
