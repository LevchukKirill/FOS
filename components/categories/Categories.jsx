import {
  Text,
  Image,
  TouchableHighlight,
  View,
  StyleSheet,
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
    <View style={styles.main}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    display: "flex",
    width: "62%",
    // borderWidth: 1,
    paddingTop: 10,
  },
  container: {
    // borderWidth: 1,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray1,
    flexDirection: "row",
    flexWrap: "wrap",
    // rowGap: 10,
    // columnGap: 0,
    paddingHorizontal: 10,
    paddingBottom: 10,

    alignItems: "center",
    justifyContent: "space-between",
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
    // borderWidth: 1,
    paddingTop: 10,
    borderRadius: SIZES.radius,
  },
});

export default Categories;
