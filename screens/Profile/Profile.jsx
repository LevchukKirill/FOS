import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import UserInfo from "../../components/profile/UserInfo";
import Settings from "../../components/profile/Settings";
import { COLORS } from "../../constants";
import { UserContext } from "../../App";

const Profile = (props) => {
  const { user } = useContext(UserContext);
  return (
    <View style={styles.container}>
      <View style={[styles.section, { height: "22%" }]}>
        <UserInfo user={user} />
      </View>
      <View style={[styles.section, { height: "77%" }]}>
        <Settings />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    display: "flex",
    flexDirection: "column",
    rowGap: 5,
  },
  section: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
});

export default Profile;
