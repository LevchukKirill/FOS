import React from "react";

import { gStyle } from "../../../styles/style";
import { Pressable, Text, View } from "react-native";

const UserCard = () => {
  return (
    <Pressable style={gStyle.button}>
      <Text style={gStyle.textBtn}></Text>
    </Pressable>
  );
};

export default UserCard;
