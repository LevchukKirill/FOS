import { Button, Linking, Text, View, StyleSheet } from "react-native";
import Auth from "../Auth/Auth.jsx";

const Header = () => {
  return (
    <View style={styles.header}>
      <View>
        <Button
          title="BONUSI"
          onPress={() => Linking.openURL("https://google.com")}
        />
      </View>
      <View>
        <Auth />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    borderColor: "black",
    height: 60,
    margin: "auto",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Header;
