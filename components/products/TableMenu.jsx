import React, { useCallback, useMemo, useState } from "react";

import { ScrollView, Text, View } from "react-native";
import { Circle } from "./Table";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Card } from "./TableItem";
import { COLORS } from "../../constants";

const TableMenu = ({ reversed, enabled, handler, foods, setEnabled }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [menuShown, setMenuShown] = useState(true);

  const handleAction = useCallback((index) => {
    setCurrentIndex(index);
    // console.log(index);
  }, []);

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
            backgroundColor: COLORS.darkGray2,
            tint: "light",
            intensity: 100,
          }}
          setEnabled={setEnabled}
          enabled={enabled}
          reversed={reversed}
          handler={handler}
          items={foods}
          onAction={handleAction}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default TableMenu;
