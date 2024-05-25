import React from "react";

import { View } from "react-native";
import { Circle } from "./Table";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { COLORS } from "../../../../smth/FOS/constants";

const TableMenu = ({
  reversed,
  enabled,
  handler,
  foods,
  setEnabled,
  stop,
  category,
}) => {
  return (
    <GestureHandlerRootView
      onTouchMove={(event) => {
        event.stopPropagation();
      }}
    >
      <View style={{ position: "relative" }}>
        <Circle
          contentContainerStyle={{
            left: !reversed ? (enabled ? 200 : 360) : !enabled ? -360 : -200,
            bottom: -35,
          }}
          blurredView={{
            // backgroundColor: "rgba(225, 225, 225, 1)",
            backgroundColor: "#2E3044",
            tint: "light",
            intensity: 100,
          }}
          stop={stop}
          setEnabled={setEnabled}
          enabled={enabled}
          reversed={reversed}
          handler={handler}
          items={foods}
          category={category}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default TableMenu;
