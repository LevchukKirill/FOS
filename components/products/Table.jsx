import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Animated, StyleProp, View, ViewStyle, StyleSheet } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
  State,
} from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import MenuItem from "../menu/MenuItem";

export const Circle = ({
  size = 500,
  iconSize = 20,
  dragSpeed = 0.5,
  contentContainerStyle,
  circleStyle,
  blurredView,
  items,
  enabled,
  handler,
  reversed,
  onAction,
}) => {
  const [rotation, setRotation] = useState(0);
  const [angleValue, setAngleValue] = useState(0);
  const [changeState, setChangeState] = useState(State.UNDETERMINED);

  const animatedAngle = useMemo(() => new Animated.Value(0), []);

  const radius = useMemo(() => size / 2, [size]);
  const iconPosition = useMemo(() => radius + iconSize, [radius, iconSize]);
  const iconOffset = useMemo(() => radius - iconSize / 2, [radius, iconSize]);
  const iconsDegree = useMemo(() => 360 / items?.length, [items]);

  useEffect(() => {
    animatedAngle.addListener(({ value }) => {
      setAngleValue(value);
      // console.log(items);
    });

    return () => animatedAngle.removeAllListeners();
  }, [animatedAngle, changeState]);

  const handleGestureEvent = useCallback(
    (event) => {
      const angle = rotation + event.nativeEvent.translationY * dragSpeed;

      const combined =
        angle > 360 ? angle - 360 : angle < 0 ? 360 + angle : angle;

      animatedAngle.setValue(combined);
    },
    [animatedAngle, rotation],
  );

  const handleHandlerStateChange = useCallback(
    (event) => {
      setChangeState(event.nativeEvent.state);

      switch (event.nativeEvent.state) {
        case State.END: {
          const angle = rotation + event.nativeEvent.translationY * dragSpeed;

          const combined =
            angle >= 360 ? angle - 360 : angle <= 0 ? 360 + angle : angle;

          animatedAngle.setValue(combined);

          const animateAngle =
            (combined % iconsDegree) - iconsDegree / 2 > 0
              ? combined - ((combined % iconsDegree) - iconsDegree)
              : combined - (combined % iconsDegree);

          Animated.spring(animatedAngle, {
            delay: 8,
            useNativeDriver: false,
            bounciness: 10,
            toValue: animateAngle,
          }).start(() => setRotation(animateAngle));

          const index = Math.floor((animateAngle / 360) * items?.length);

          const itemIndex = items?.length - index;

          onAction(itemIndex >= items?.length ? 0 : itemIndex);
          break;
        }
      }
    },
    [animatedAngle, rotation, iconsDegree],
  );

  const foodList = useMemo(
    () =>
      items?.map((item, idx) => {
        // console.log(item);
        const angle = reversed
          ? idx * iconsDegree + angleValue
          : idx * iconsDegree + angleValue - 90;
        const x = reversed
          ? iconPosition * Math.cos((Math.PI * 2 * angle) / 360) + iconOffset
          : iconPosition * Math.sin((Math.PI * 2 * angle) / 360) + iconOffset;
        const y = reversed
          ? iconPosition * Math.sin((Math.PI * 2 * angle) / 360) + iconOffset
          : iconPosition * Math.cos((Math.PI * 2 * angle) / 360) + iconOffset;

        return (
          // <View style={{ borderWidth: 1 }}>
          <View
            key={idx}
            style={{
              borderWidth: 1,
              position: "absolute",
              left: x,
              top: y - 25,
              display: "flex",
              // width: iconSize + 4,
              // height: iconSize + 4,
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "yellow",
            }}
          >
            <MenuItem food={item} />
          </View>
          // </View>
        );
      }),
    [items, iconPosition, angleValue],
  );

  // const background = animatedAngle.interpolate({
  //   inputRange: [
  //     ...[...new Array(items.length)].map(
  //       (val, idx) => (360 / items.length) * idx,
  //     ),
  //     360,
  //   ],
  //   outputRange: [...items.map((val, idx) => items[idx].color), items[0].color],
  // });

  return (
    <PanGestureHandler
      onGestureEvent={handleGestureEvent}
      onHandlerStateChange={handleHandlerStateChange}
    >
      <View
        style={[
          contentContainerStyle,
          {
            // flex: 1,

            alignItems: "center",
            justifyContent: "center",
            // position: "absolute",
          },
        ]}
      >
        <Animated.View
          style={[
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              overflow: "visible",
            },
            circleStyle,
          ]}
        >
          {blurredView ? (
            <View style={styles.itemsContainer} {...blurredView}>
              {foodList}
            </View>
          ) : (
            <View style={styles.itemsContainer}>{foodList}</View>
          )}
        </Animated.View>
      </View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  itemsContainer: {
    position: "absolute",

    width: "100%",
    height: "100%",
    borderRadius: 500,
  },
});
