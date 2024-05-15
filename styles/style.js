import { StyleSheet } from "react-native";
import { FONTS } from "../constants/theme";

// const fonts = async () =>
//   await Font.loadAsync({
//     "gothi-c": require("./assets/fonts/gothic.ttf"),
//     "r-black": require("./assets/fonts/Roboto-Black.ttf"),
//     "r-black": require("./assets/fonts/Roboto-Black.ttf"),
//     "r-bold": require("./assets/fonts/Roboto-Bold.ttf"),
//     "r-light": require("./assets/fonts/Roboto-Light.ttf"),
//     "r-regular": require("./assets/fonts/Roboto-Regular.ttf"),
//     "r-medium": require("./assets/fonts/Roboto-Medium.ttf"),
//     "r-thin": require("./assets/fonts/Roboto-Thin.ttf"),
//   });

export const gStyle = StyleSheet.create({
  title: {
    fontSize: 17,
    fontFamily: "r-black",
    marginBottom: 3,
    fontWeight: '500'
  },
  text: {
    //fontFamily: "gothic",
    fontFamily: '',
    fontSize: '16',
    marginBottom: 3,
    fontWeight: '400'
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    alignItems: "center",
    //justifyContent: "center",
    borderRadius:30,
    backgroundColor: "rgba(255, 140, 0, 0.6)",
    
    //opacity: 0.9

    //backgroundColor: "#ff8c00",
  }, 
  textBtn: {
    fontSize: 15,
    fontWeight: "500",
    color: "#843700",
    opacity: 0.8,
  },
  line: {
    marginTop: "8%",
    width: "40%",
    height: "1.5%",
    backgroundColor: "rgba(211, 211, 211, 0.5)",
    borderRadius: 20,
    marginLeft: '30%'
  }
});
