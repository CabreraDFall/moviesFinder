import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  Platform,
} from "react-native";
import { image500 } from "../api/moviedb";

const { width, height } = Dimensions.get("window");

const SPACING = 10;
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.62 : width * 0.64;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

export default function TrendingMovies({ data }) {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();

  // Adding empty items to the start and end of the data array
  const dataWithEmptyItems = [
    { key: "empty-left" },
    ...data,
    { key: "empty-right" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trending Movies</Text>

      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={dataWithEmptyItems}
        keyExtractor={(item) => item.key || item.id.toString()} // Ensure the key is unique
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={{ alignItems: "center" }}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          // If the item is one of the empty items, return an empty view with the corresponding size
          if (!item.poster_path) {
            return (
              <View
                style={{
                  width: EMPTY_ITEM_SIZE,
                }}
              />
            );
          }
          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -25, 0],
            extrapolate: "clamp",
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.65, 1, 0.5],
            extrapolate: "clamp",
          });

          const handleClick = () => {
            navigation.navigate("Movie", item);
          };

          return (
            <View style={{ width: ITEM_SIZE }}>
              <TouchableOpacity onPress={handleClick}>
                <Animated.View
                  style={{
                    marginHorizontal: SPACING,
                    marginTop: 25,
                    alignItems: "center",
                    transform: [{ translateY }],
                    opacity,
                  }}
                >
                  <Image
                    source={{ uri: image500(item.poster_path) }}
                    style={styles.posterImage}
                  />
                </Animated.View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 24,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  posterImage: {
    width: "100%",
    height: ITEM_SIZE * 1.2,
    resizeMode: "cover",
    borderRadius: 16,
    margin: 0,
    marginBottom: 10,
  },
});
