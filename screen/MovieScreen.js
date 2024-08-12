import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast";
import MovieList from "../components/movieList";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-3";

const MovieScreen = () => {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavourite, setIsFavourite] = useState(false);
  const [cast, setCast] = useState([1, 2, 3, 4, 5]);
  const [similiarMovies, setSimiliarMovies] = useState([1, 2, 3, 4, 5]);
  let moviesName = "Ant-Man and then wasp: Quatumania";

  useEffect(() => {
    //call API
  }, [item]);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-800 "
    >
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row justify-between items-center px-4" +
            topMargin
          }
        >
          <TouchableOpacity
            className="rounded-xl p-1"
            onPress={() => {
              navigation.goBack();
            }}
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
            <HeartIcon
              size="35"
              color={isFavourite ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>
        <View>
          <Image
            source={{
              uri: "https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200",
            }}
            style={{ width, height: height * 0.55 }}
          />
          <LinearGradient
            colors={["transparent", "rgba(38,38,38,0.7)", "rgba(38,38,38,1)"]}
            style={{ width, height: height * 0.8 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </View>
        <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
          <Text className="text-white text-center text-3xl font-old tracking-wider">
            {moviesName}
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Released • 2020 • 170 min
          </Text>
          <View className="flex-row justify-center mx-4 space-x-2">
            <Text className="text-neutral-400 font-semibold text-base text-center">
              Action •
            </Text>
            <Text className="text-neutral-400 font-semibold text-base text-center">
              Thrill •
            </Text>
            <Text className="text-neutral-400 font-semibold text-base text-center">
              Comedy
            </Text>
          </View>

          <Text className="text-neutral-400 mx-4 tracking-wide">
            Scott Lang vuelve a enfundarse el traje de Ant-Man para pelear codo
            con codo junto a la Avispa. La misión revelará a los dos superhéroes
            un secreto terrible y los enfrentará a su enemigo más poderoso.
          </Text>
        </View>
      </View>
      <Cast navigation={navigation} cast={cast} />

      <MovieList
        title="Similar Movies"
        hideSeeAll={true}
        data={similiarMovies}
      />
    </ScrollView>
  );
};

export default MovieScreen;
