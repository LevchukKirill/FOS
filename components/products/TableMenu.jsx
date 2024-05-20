import React, { useCallback, useMemo, useState } from "react";

import { ScrollView, Text, View } from "react-native";
import { Circle } from "./Table";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Card } from "./TableItem";
import { COLORS } from "../../constants";

const TableMenu = ({ reversed, enabled, handler, foods }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAction = useCallback((index) => {
    setCurrentIndex(index);
    // console.log(index);
  }, []);

  return (
    <GestureHandlerRootView>
      <View style={{ position: "relative" }}>
        <Circle
          contentContainerStyle={{
            left: !reversed ? (enabled ? 200 : 330) : !enabled ? -330 : -200,
          }}
          blurredView={{
            backgroundColor: COLORS.lightGray1,
            tint: "light",
            intensity: 100,
          }}
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
