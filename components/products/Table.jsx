import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Animated,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import MenuItem from "../menu/MenuItem";

const tableSize = 8;

function getCycledIdx(arr, idx) {
  idx %= arr.length;
  if (idx < 0) idx += arr.length;

  return idx;
}

export const Circle = ({
  size = 470,
  iconSize = 20,
  dragSpeed = 0.5,
  contentContainerStyle,
  circleStyle,
  blurredView,
  items: foods,
  enabled,
  setEnabled,
  category,
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
  const padding = useMemo(() => 360 / 8, [foods]);
  const activeCycledIdx = useMemo(() => {
    const shift = reversed ? 270 : 90;
    const angle = reversed
      ? ((angleValue + shift) % 360) + 90
      : (angleValue + shift) % 360;
    const idx = (tableSize - Math.round(angle / 45)) % tableSize;

    return idx;
  }, [angleValue, reversed]);

  const arrows = [
    require("../../assets/Vector.png"),
    require("../../assets/Vector2.png"),
  ];

  const [itemsCycle, setItemsCycle] = useState(() => {
    const arr = [
      ...foods.slice(foods.length - activeCycledIdx),
      ...foods.slice(0, foods.length - activeCycledIdx),
    ];

    while (arr.length < tableSize) {
      arr.push(...arr);
    }

    return arr.slice(0, tableSize);
  });

  useEffect(() => {
    setItemsCycle((itemsCycle) => {
      const activeFood = itemsCycle[activeCycledIdx];
      if (!activeFood) return itemsCycle;
      const activeFoodsIdx = foods.findIndex((f) => f.id === activeFood.id);
      const copy = itemsCycle.slice();

      const posToChange = [-2, -1, 1, 2];
      posToChange.forEach((pos) => {
        const cycledIdx = getCycledIdx(itemsCycle, activeCycledIdx + pos);
        const foodsIdx = getCycledIdx(foods, activeFoodsIdx + pos);
        copy[cycledIdx] = foods[foodsIdx];
      });

      return copy;
    });
  }, [activeCycledIdx, foods, category]);

  useEffect(() => {
    animatedAngle.addListener(({ value }) => {
      setAngleValue(value);
    });

    return () => animatedAngle.removeAllListeners();
  }, [animatedAngle, changeState]);

  const handleGestureEvent = useCallback(
    (event) => {
      let modify = [0.5, 1];
      if (!enabled) return;
      let angle = (rotation + event.nativeEvent.translationY * dragSpeed) % 360;

      angle %= 360;
      angle = angle <= 0 ? 360 + angle : angle;

      animatedAngle.setValue(angle);
    },
    [animatedAngle, rotation, enabled],
  );

  const handleHandlerStateChange = useCallback(
    (event) => {
      if (!enabled) return;

      setChangeState(event.nativeEvent.state);

      switch (event.nativeEvent.state) {
        case State.END: {
          // canOverRotate = true;
          const angle = rotation + event.nativeEvent.translationY * dragSpeed;
          const combined =
            angle >= 360 ? angle - 360 : angle <= 0 ? 360 + angle : angle;

          animatedAngle.setValue(combined);

          const animateAngle =
            (combined % padding) - padding / 2 > 0
              ? combined - ((combined % padding) - padding)
              : combined - (combined % padding);

          Animated.spring(animatedAngle, {
            delay: 8,
            useNativeDriver: false,
            bounciness: 10,
            toValue: animateAngle,
          }).start(() => setRotation(animateAngle));

          break;
        }
      }
    },
    [animatedAngle, rotation, padding, enabled],
  );

  const foodList = useMemo(
    () =>
      itemsCycle.map((item, idx) => {
        const isActive = idx === activeCycledIdx;

        const itemAngle = (idx * padding + angleValue) % 360;
        const x = reversed
          ? iconPosition * Math.cos((Math.PI * 2 * itemAngle) / 360) +
            iconOffset
          : iconPosition * Math.sin((Math.PI * 2 * itemAngle) / 360) +
            iconOffset;
        const y = reversed
          ? iconPosition * Math.sin((Math.PI * 2 * itemAngle) / 360) +
            iconOffset
          : iconPosition * Math.cos((Math.PI * 2 * itemAngle) / 360) +
            iconOffset;

        return (
          <View
            key={idx}
            style={{
              position: "absolute",
              left:
                isActive && enabled
                  ? x - 45
                  : enabled
                    ? x - 15
                    : !isActive
                      ? x - 25
                      : x - 10,
              top:
                isActive && enabled
                  ? y - 25
                  : enabled
                    ? y - 15
                    : !isActive
                      ? y - 25
                      : y - 35,
              width: isActive ? "50%" : 100,
              height: isActive ? 100 : 70,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MenuItem isActive={isActive} isEnabled={enabled} food={item} />
          </View>
        );
      }),
    [iconPosition, angleValue, enabled, reversed],
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
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <Animated.View
          style={[
            {
              width: size,
              height: size,
              borderRadius: size / 2,
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
            // borderWidth: 3,
            // position: "relative",
            left: reversed
              ? enabled
                ? size / 2 + size / 6
                : size / 2 + size / 8
              : enabled
                ? -size / 2 - size / 4
                : -size / 2 - size / 6,
            top: -size / 2,
          }}
          onPress={() => {
            setEnabled(!enabled);
          }}
        >
          <View
            style={{
              position: "absolute",
              top: -10,
              // right: reversed ? -622 : -40,
              // zIndex: 3,
              borderWidth: 1,
            }}
          >
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
