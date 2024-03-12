import { Text, Image, TouchableHighlight, View } from 'react-native';
import { CategoriesData } from '../../data/CategoiresData';
import { COLORS, SIZES } from '../../constants/theme';
import { useState } from 'react';
import { styles } from '../../style';
import { BoxShadow } from 'react-native-shadow';

const Categories = () => {
  const [active, setActive] = useState(null);
  return (
    <View
      style={{ marginTop: 20, width: '65%', paddingLeft: 20, borderWidth: 1 }}
    >
      <Text style={{ fontSize: SIZES.h2 }}>Категории</Text>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {CategoriesData.map((cat, idx) => (
          <BoxShadow
            setting={{
              width: 90,
              height: 100,
              color: COLORS.black,
              border: 10,
              radius: SIZES.radius,
              opacity: 0.2,
              x: 0,
              y: 10,
              style: { marginVertical: 15 },
            }}
          >
            <View
              style={{
                width: 90,
                marginTop: 10,

                borderRadius: SIZES.radius,
              }}
            >
              <TouchableHighlight
                underlayColor={COLORS.primary}
                onPress={() => setActive(idx)}
                style={{
                  borderRadius: SIZES.radius,
                }}
              >
                <View
                  style={{
                    backgroundColor:
                      active === idx ? COLORS.primary : COLORS.white,
                    alignItems: 'center',
                    paddingTop: 5,

                    borderRadius: SIZES.radius,
                  }}
                >
                  <Image
                    source={{ uri: cat.image }}
                    style={{ width: 75, height: 75 }}
                  />
                  <Text style={{ fontSize: SIZES.h4 }}>{cat.name}</Text>
                </View>
              </TouchableHighlight>
            </View>
          </BoxShadow>
        ))}
      </View>
    </View>
  );
};

export default Categories;
