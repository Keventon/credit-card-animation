import { SafeAreaView, StatusBar, Text, View } from "react-native";
import { styles } from "./styles";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type CreditCardProps = {
  cardSide: SharedValue<number>;
  data: {
    name: string;
    number: string;
    date: string;
    code: string;
  };
};

export enum CardSide {
  FRONT = 0,
  BACK = 1,
}

export function CreditCard({ cardSide, data }: CreditCardProps) {
  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(
      cardSide.value,
      [CardSide.FRONT, CardSide.BACK],
      [0, 180]
    );

    return {
      transform: [
        { rotateY: withTiming(`${rotateValue}deg`, { duration: 1000 }) },
      ],
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(
      cardSide.value,
      [CardSide.FRONT, CardSide.BACK],
      [180, 360]
    );

    return {
      transform: [
        { rotateY: withTiming(`${rotateValue}deg`, { duration: 1000 }) },
      ],
    };
  });

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <Animated.View style={[styles.card, styles.front, frontAnimatedStyle]}>
        <View style={styles.header}>
          <View style={[styles.circle, styles.logo]} />
          <Text>Meu Cartão</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.name}>{data.name}</Text>

          <View style={styles.flag}>
            <View style={[styles.circle, styles.red]} />
            <View style={[styles.circle, styles.orange]} />
          </View>
        </View>
      </Animated.View>

      <Animated.View style={[styles.card, styles.back, backAnimatedStyle]}>
        <View>
          <Text>Número do Cartão</Text>
          <Text style={styles.value}>{data.number}</Text>
        </View>

        <View style={styles.footer}>
          <View>
            <Text>Validade</Text>
            <Text style={styles.value}>{data.date}</Text>
          </View>

          <View>
            <Text>CVV</Text>
            <Text style={styles.value}>{data.code}</Text>
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}
