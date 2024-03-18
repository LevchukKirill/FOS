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

// import { styles } from "../../style";
// import { BoxShadow } from "react-native-shadow";

const Categories = () => {
  const [active, setActive] = useState(null);
  return (
    <View style={{ width: "65%", paddingLeft: 20, borderWidth: 0 }}>
      <View style={styles.container}>
        {catData.map((cat, idx) => (
          <View style={styles.catItem}>
            {/*<Text>{Object.values(cat).join("\n")}</Text>*/}
            <CategoryItem
              cat={cat}
              isActive={active === idx}
              clickHandler={() => setActive(idx)}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
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
    width: 90,
    marginTop: 10,
    borderRadius: SIZES.radius,
  },
});

export default Categories;
