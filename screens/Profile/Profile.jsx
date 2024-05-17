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
      <View
        style={[
          styles.section,
          { height: Platform.OS === "ios" ? "30%" : "31%" },
        ]}
      >
        <UserInfo user={user} />
      </View>
      <View
        style={[
          styles.section,
          { height: Platform.OS === "ios" ? "70%" : "69%" },
        ]}
      >
        <Settings />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    // borderWidth: 1,
    // paddingHorizontal: 10,
    paddingVertical: 1,
    display: "flex",
    flexDirection: "column",
    // backgroundColor: COLORS.white,
    // rowGap: 5,
  },
  section: {
    backgroundColor: COLORS.white,
    // borderRadius: 10,
  },
});

export default Profile;
