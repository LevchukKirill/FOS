import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import UserInfo from "../../components/profile/UserInfo";
import Settings from "../../components/profile/Settings";
import { COLORS } from "../../constants";
import { UserContext } from "../../hooks/useUser";
import { Platform } from "react-native";

const Profile = (props) => {
  const { user } = useContext(UserContext);
  return (
    <View style={styles.container}>
      <View style={{ height: "30%" }}>
        <UserInfo user={user} />
      </View>
      <View>
        <Settings />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: COLORS.white,
  },
});

export default Profile;
