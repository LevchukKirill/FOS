import React from "react";
import { View, StyleSheet, Text } from "react-native";
import UserInfo from "../../components/profile/UserInfo";
import Settings from "../../components/profile/Settings";

const Profile = (props) => {
  return (
    <View>
      <UserInfo />
      <Settings />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Profile;
