import React, { useCallback, useEffect, useMemo, useState } from "react";

import { Pressable, Text, View, StyleSheet, Animated } from "react-native";
import { COLORS } from "../../constants";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
  State,
} from "react-native-gesture-handler";
import { BlurView } from "expo-blur";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Table = ({
  size = 300,
  iconSize = 28,
  dragSpeed = 0.5,
  contentContainerStyle,
  circleStyle,
  blurredView,
  items,
  onAction,
}) => {
  const [rotation, setRotation] = useState(0);
  const [angleValue, setAngleValue] = useState(0);
  const [changeState, setChangeState] = useState(State.UNDETERMINED);

  const animatedAngle = useMemo(() => new Animated.Value(0), []);

  const radius = useMemo(() => size / 2, [size]);
  const iconPosition = useMemo(() => radius - iconSize, [radius, iconSize]);
  const iconOffset = useMemo(() => radius - iconSize / 2, [radius, iconSize]);
  const iconsDegree = useMemo(() => 360 / items.length, [items]);

  useEffect(() => {
    animatedAngle.addListener(({ value }) => {
      setAngleValue(value);
    });

    return () => animatedAngle.removeAllListeners();
  }, [animatedAngle, changeState]);

  const handleGestureEvent = useCallback(
    (PanGestureHandlerGestureEvent) => {
      const angle = rotation + event.nativeEvent.translationX * dragSpeed;

      const combined =
        angle > 360 ? angle - 360 : angle < 0 ? 360 + angle : angle;

      animatedAngle.setValue(combined);
    },
    [animatedAngle, rotation],
  );

  const handleHandlerStateChange = useCallback(
    (PanGestureHandlerStateChangeEvent) => {
      setChangeState(event.nativeEvent.state);

      switch (event.nativeEvent.state) {
        case State.END: {
          const angle = rotation + event.nativeEvent.translationX * dragSpeed;

          const combined =
            angle >= 360 ? angle - 360 : angle <= 0 ? 360 + angle : angle;

          animatedAngle.setValue(combined);

          const animateAngle =
            (combined % iconsDegree) - iconsDegree / 2 > 0
              ? combined - ((combined % iconsDegree) - iconsDegree)
              : combined - (combined % iconsDegree);

          Animated.spring(animatedAngle, {
            delay: 8,
            bounciness: 10,
            toValue: animateAngle,
          }).start(() => setRotation(animateAngle));

          const index = Math.floor((animateAngle / 360) * items.length);

          const itemIndex = items.length - index;

          onAction(itemIndex >= items.length ? 0 : itemIndex);
          break;
        }
      }
    },
    [animatedAngle, rotation, iconsDegree],
  );

  const styles = StyleSheet.create({
    itemsContainer: {
      position: "absolute",
      width: "100%",
      height: "100%",
    },
    circle: {
      width: 200,
      height: 200,
      borderRadius: 200 / 2,
      backgroundColor: COLORS.primary,
    },
  });
};
