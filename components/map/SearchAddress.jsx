import React, { useState } from "react";

import { Text, TextInput, View } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
const SearchAddress = () => {
  const [addresses, setAddresses] = useState([]);
  let abortController;
  async function searchAddress(address) {
    console.log(0);
    if (abortController) {
      abortController.abort();
    }
    abortController = new AbortController();
    const url = `https://api.maptiler.com/geocoding/${address}.json?language=ru&country=ru&key=71FOwe88fQP2mFvqVgJ8`;
    // const geoCodes = await Location.geocodeAsync(address);
    const geoCodes = await axios
      .get(url, { signal: abortController.signal })
      .then((res) => res.data);
    console.log(
      address,
      geoCodes.features.map((i) => i.center), //lon lat
    );

    setAddresses(geoCodes.features);
  }
  return (
    <View style={{ position: "relative" }}>
      <TextInput onChangeText={searchAddress}></TextInput>
      <View style={{ position: "absolute", top: "100%", left: 0, right: 0 }}>
        {addresses?.map((item) => (
          <Text>
            {item.country}, {item.region}, {item.city}, {item.street},{" "}
            {item.streetNumber}, {item.postalCode}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default SearchAddress;
