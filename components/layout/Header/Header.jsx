import { Button, Linking, Text, View } from "react-native";

const Header = () => {
  return (
    <View
      style={{
        borderColor: "black",
        borderWidth: 1,
        height: 60,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View>
        <Button
          title='BONUSI'
          onPress={() => Linking.openURL("https://google.com")}
        />
      </View>
      <View>
        <Button
          title='BONUS CARD'
          onPress={() => Linking.openURL("https://vk.com")}
        />
      </View>
    </View>
  );
};

export default Header;
