import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Animated,
  StyleProp,
  View,
  ViewStyle,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
  State,
} from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import MenuItem from "../menu/MenuItem";

export const Circle = ({
  size = 470,
  iconSize = 20,
  dragSpeed = 0.5,
  contentContainerStyle,
  circleStyle,
  blurredView,
  items,
  enabled,
  setEnabled,
  handler,
  reversed,
  onAction,
}) => {
  const [rotation, setRotation] = useState(0);
  const [angleValue, setAngleValue] = useState(0);
  const [changeState, setChangeState] = useState(State.UNDETERMINED);
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [isEnabled, setIsEnabled] = useState(enabled);

  const animatedAngle = useMemo(() => new Animated.Value(0), []);

  const radius = useMemo(() => size / 2, [size]);
  const iconPosition = useMemo(() => radius + iconSize, [radius, iconSize]);
  const iconOffset = useMemo(() => radius - iconSize / 2, [radius, iconSize]);
  const iconsDegree = useMemo(() => 360 / items?.length, [items]);

  const arrows = [
    require("../../assets/Vector.png"),
    require("../../assets/Vector2.png"),
  ];

  useEffect(() => {
    animatedAngle.addListener(({ value }) => {
      setAngleValue(value);
      // console.log(items);
    });

    return () => animatedAngle.removeAllListeners();
  }, [animatedAngle, changeState]);

  const handleGestureEvent = useCallback(
    (event) => {
      event.stopPropagation();
      console.log("gesture event");
      let modify = [0.5, 1];
      // console.log(enabled, "handler");w
      if (!enabled) return;
      const angle = rotation + event.nativeEvent.translationY * dragSpeed;

      const combined =
        angle > 360 ? angle - 360 : angle <= 0 ? 360 + angle : angle;

      // const combined =
      //     angle >= 360 ? angle - 360 : angle <= 0 ? 360 + angle : angle;

      const animateAngle =
        (combined % iconsDegree) - iconsDegree / 2 > 0
          ? combined - ((combined % iconsDegree) - iconsDegree)
          : combined - (combined % iconsDegree);

      const index = Math.floor((animateAngle / 360) * items?.length);
      const itemIndex = items?.length - index;
      // console.log((combined * itemIndex) / 360);
      setCurrentIndex(itemIndex >= items?.length ? 0 : itemIndex);

      animatedAngle.setValue(combined);
    },
    [animatedAngle, rotation, enabled],
  );

  const handleHandlerStateChange = useCallback(
    (event) => {
      // console.log(enabled, "callback");
      if (!enabled) return;

      setChangeState(event.nativeEvent.state);

      switch (event.nativeEvent.state) {
        case State.END: {
          const angle = rotation + event.nativeEvent.translationY * dragSpeed;
          console.log(angle);
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
          console.log(animateAngle);

          // const index = Math.floor((animateAngle / 360) * items?.length);
          // const itemIndex = items?.length - index;
          //
          // setCurrentIndex(itemIndex >= items?.length ? 0 : itemIndex);
          // setCurrentIndex(itemIndex);
          break;
        }
      }
    },
    [animatedAngle, rotation, iconsDegree, enabled],
  );

  const foodList = useMemo(
    () =>
      // new Array(8).map((item, idx) => {
      items?.map((item, idx) => {
        const angle = reversed
          ? idx * iconsDegree + angleValue
          : idx * iconsDegree + angleValue - 90;
        const x = reversed
          ? iconPosition * Math.cos((Math.PI * 2 * angle) / 360) + iconOffset
          : iconPosition * Math.sin((Math.PI * 2 * angle) / 360) + iconOffset;
        const y = reversed
          ? iconPosition * Math.sin((Math.PI * 2 * angle) / 360) + iconOffset
          : iconPosition * Math.cos((Math.PI * 2 * angle) / 360) + iconOffset;
        console.log({
          angle,
          x,
          y,
          idx,
          iconsDegree,
          angleValue,
          iconPosition,
          iconOffset,
        });
        return (
          // <View style={{ borderWidth: 1 }}>
          <View
            key={idx}
            style={{
              // borderWidth: 1,
              position: "absolute",
              left:
                currentIndex === idx && enabled
                  ? x - 45
                  : enabled
                    ? x - 15
                    : currentIndex !== idx
                      ? x - 25
                      : x - 10,
              // top: y - 25,
              top:
                currentIndex === idx && enabled
                  ? y - 25
                  : enabled
                    ? y - 15
                    : currentIndex !== idx
                      ? y - 25
                      : y - 35,
              width: currentIndex === idx ? "50%" : 100,
              height: currentIndex === idx ? 100 : 70,
              // width: 100,
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "yellow",
            }}
          >
            <MenuItem
              isActive={currentIndex === idx}
              isEnabled={enabled}
              food={item}
            />
          </View>
          // </View>
        );
      }),
    [items, iconPosition, angleValue, enabled],
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
        onTouchMove={(event) => {
          console.log("touch event");
          event.stopPropagation();
        }}
        style={[
          contentContainerStyle,
          {
            // borderWidth: 1,
            // flex: 1,
            // position: "relative",
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
              // overflow: "hidden",
              // borderWidth: 1,
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
        <TouchableOpacity
          style={{
            position: "absolute",
            left: enabled ? -size / 3 : -size / 4,
          }}
          onPress={() => {
            setEnabled(!enabled);
          }}
        >
          <View>
            {enabled ? (
              <Image
                source={arrows[1]}
                style={{ width: 35, height: 35, objectFit: "scale-down" }}
              />
            ) : (
              <Image
                source={arrows[0]}
                style={{ width: 35, height: 35, objectFit: "scale-down" }}
              />
            )}
          </View>
        </TouchableOpacity>
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
