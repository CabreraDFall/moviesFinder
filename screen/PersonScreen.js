import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
const {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} = require("react-native");

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : " my-3";

const PersonScreen = () => {
  const navigation = useNavigation();
  const [isFavourite, setIsFavourite] = useState(false);
  const [personMovies, setPersonMovies] = useState([1, 2, 3, 4]);
  const [loading, setLoading] = useState(false);
  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <SafeAreaView
        className={
          "z-20 w-full flex-row justify-between items-center px-4" +
          verticalMargin
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

      {loading ? (
        <Loading />
      ) : (
        <View>
          <View
            className="flex-row justify-center"
            style={{
              shadowColor: "gray",
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
            }}
          >
            <View className="overflow-hidden rounded-lg border-white-100">
              <Image
                source={{
                  uri: "https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200",
                }}
                style={{ width: width * 0.74, height: height * 0.43 }}
              />
            </View>
          </View>
          <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">
              Keanu Reeves
            </Text>
            <Text className="text-base text-neutral-500 text-center">
              London, United Kingdon
            </Text>
          </View>
          <View className="mx-3 p-4 mt-6  rounded-lg flex-row justify-between items-center bg-neutral-700">
            <View className="border-r-2 border-r-neutral-500 px-2 items-center">
              <Text className="text-white font-semibold">gender</Text>
              <Text className="text-neutral-300 text-base">Male</Text>
            </View>
            <View className="border-r-2 border-r-neutral-500 px-2 items-center">
              <Text className="text-white font-semibold">gender</Text>
              <Text className="text-neutral-300 text-base">Male</Text>
            </View>
            <View className="border-r-2 border-r-neutral-500 px-2 items-center">
              <Text className="text-white font-semibold">gender</Text>
              <Text className="text-neutral-300 text-base">Male</Text>
            </View>
            <View className="px-2 items-center">
              <Text className="text-white font-semibold">gender</Text>
              <Text className="text-neutral-300 text-base">Male</Text>
            </View>
          </View>
          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
              Keanu Charles Reeves (pronunciado [kiˈɑːnuː] Beirut, 2 de
              septiembre de 1964), conocido como Keanu Reeves, es un actor y
              músico canadiense.2​Es conocido por interpretar a Neo en Matrix y
              a John Wick en la saga John Wick. Tiene entre su repertorio las
              comedias de la franquicia de Bill y Ted (1989-2020); los thrillers
              de acción Point Break (1991), Speed (1994) y la franquicia John
              Wick (2014-2023); el thriller psicológico The Devil's Advocate
              (1997); el thriller sobrenatural Constantine (2005); y la saga de
              ciencia ficción y acción The Matrix (1999-2021). También ha
              participado en películas dramáticas como Dangerous Liaisons
              (1988), My Own Private Idaho (1991) y Little Buddha (1993), así
              como en la película de terror y romance Bram Stoker's Dracula
              (1992) en el papel de Jonathan Harker.
            </Text>
          </View>

          <MovieList title={"Movies"} hideSeeAll={true} data={personMovies} />
        </View>
      )}
    </ScrollView>
  );
};

export default PersonScreen;
