import React from "react";
import MapView from "react-native-maps";
import { View } from "react-native";

const Map = () => {
  return (
    <View style={{ width: "100%", height: "100%", aspectRatio: "1/1" }}>
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
};

export default Map;
