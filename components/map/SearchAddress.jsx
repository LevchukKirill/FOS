import React, { useCallback, useMemo, useRef, useState } from "react";

import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";
import {
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import Map from "./Map";
const SearchAddress = ({ isActive, userAddress, restAddress }) => {
  const [addresses, setAddresses] = useState([]);
  // variables
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["65%", "65%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  let abortController;
  async function searchAddress(address) {
    if (abortController) {
      abortController.abort();
    }
    abortController = new AbortController();
    const url = `https://api.maptiler.com/geocoding/${address} Черняховск.json?language=ru&country=ru&key=71FOwe88fQP2mFvqVgJ8`;
    // const geoCodes = await Location.geocodeAsync(address);
    const geoCodes = await axios
      .get(url, { signal: abortController.signal })
      .then((res) => res.data);
    console.log(
      geoCodes.features.map((i) => i), //lon lat
    );

    setAddresses(geoCodes.features);
  }
  return (
    <View style={{ position: "relative" }}>
      <TouchableOpacity disabled={!isActive} onPress={handlePresentModalPress}>
        <Text
          style={{
            textDecorationLine: isActive ? "underline" : "none",
            textDecorationColor: "rgba(255,115,0,0.5)",
            fontSize: 16,
            color:
              isActive && userAddress === "" ? "rgba(255,115,0,1)" : "black",
          }}
        >
          {!isActive
            ? restAddress
            : userAddress === ""
              ? "Укажите свой адрес"
              : userAddress}
        </Text>
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={styles.shadow}
        backgroundStyle={{
          // backgroundColor: COLORS.lightGray1,
          borderRadius: 20,
        }}
      >
        <BottomSheetView
          style={[styles.modalView, styles.contentContainer, styles.blur]}
        >
          <View style={{ width: "100%", height: "130%", position: "absolute" }}>
            <Map />
          </View>
          <BottomSheetTextInput
            style={{ padding: 5, borderRadius: 5, borderWidth: 1 }}
            onChangeText={searchAddress}
          ></BottomSheetTextInput>
          <ScrollView
            style={{
              position: "absolute",
              top: "70%",
              left: 0,
              // gap: 5,
              right: 0,
              // flex: 1,
              // width: "100%",
              height: "20%",
              // borderWidth: 1,
            }}
          >
            {addresses?.length !== 0 ? (
              addresses?.map((item) => (
                <TouchableOpacity key={item.id}>
                  <View
                    style={{
                      marginBottom: 5,
                      padding: 5,
                      backgroundColor: "white",
                      borderRadius: 10,
                    }}
                  >
                    <Text>{item.place_name}</Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text>Введите свой адрес</Text>
            )}
          </ScrollView>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: "100%",
    paddingHorizontal: 30,
    flex: 1,
    rowGap: 5,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    borderRadius: 20,
    elevation: 8,
  },
});

export default SearchAddress;
