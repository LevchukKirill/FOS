import CircularProgress from "react-native-circular-progress-indicator";
import React from "react";
import { View, Text } from "react-native";
import { COLORS } from "../../constants";

const CircleLoad = () => {
  return (
    <View>
      <Text>ПРИВЕТ</Text>
      {/*<CircularProgress />*/}
      <CircularProgress
        value={100}
        radius={120}
        strokeColorConfig={[
          { color: COLORS.white, value: 0 },
          { color: COLORS.primary, value: 100 },
        ]}
        initialValue={0}
        progressValueColor={"#fff"}
        activeStrokeWidth={15}
        inActiveStrokeWidth={15}
        duration={2000}
        onAnimationComplete={() => alert("Load Complete")}
      />
    </View>
  );
};

export default CircleLoad;
