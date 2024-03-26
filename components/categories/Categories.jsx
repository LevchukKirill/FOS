import {
  Text,
  Image,
  TouchableHighlight,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { CategoriesData as catData } from "../../data/CategoiresData";
import { COLORS, SIZES } from "../../constants/theme";
import { useState } from "react";
import CategoryItem from "./CategoryItem";
import DiscountButton from "./DiscountButton";

// import { styles } from "../../style";
// import { BoxShadow } from "react-native-shadow";

const Categories = (props) => {
  const [active, setActive] = useState(null);
  return (
    <ScrollView style={styles.main}>
      <View style={styles.container}>
        {catData.map((cat, idx) => (
          <View style={styles.catItem}>
            {/*<Text>{Object.values(cat).join("\n")}</Text>*/}
            <CategoryItem
              cat={cat}
              isActive={active === idx}
              clickHandler={() => setActive(idx)}
            />

            {/*<DiscountButton*/}
            {/*  isActive={active === idx}*/}
            {/*  clickHandler={() => setActive(idx)}*/}
            {/*/>*/}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    display: "flex",
    maxWidth: "64%",
    width: "auto",
    height: "100%",
    paddingTop: 10,
  },
  container: {
    display: "flex",
    borderRadius: 20,
    height: "100%",
    backgroundColor: COLORS.lightGray1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    padding: 10,
    alignItems: "stretch",
    justifyContent: "stretch",
  },
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

    borderRadius: SIZES.radius,
  },
  catItem: {
    borderWidth: 1,
    maxWidth: "50%",
    // transform: [{ translateX: 50 }],
    borderRadius: SIZES.radius,
  },
});

export default Categories;
