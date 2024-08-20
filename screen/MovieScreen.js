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
import Loading from "../components/loading";
import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMoviesDetails,
  fetchSimilarMovies,
  image500,
} from "../api/moviedb";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-3";

const MovieScreen = () => {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavourite, setIsFavourite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similiarMovies, setSimiliarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  let moviesName = "Ant-Man and then wasp: Quatumania";

  useEffect(() => {
    setLoading(true);
    getMovieDetails(item.id);
    getCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMoviesDetails(id);
    if (data) setMovie(data);
    setLoading(false);
  };

  const getCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    if (data && data.cast) setCast(data.cast);
  };
  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) setSimiliarMovies(data.results);
  };

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

        {loading ? (
          <Loading />
        ) : (
          <>
            <View>
              <Image
                source={{
                  uri: image500(movie?.poster_path || fallbackMoviePoster),
                }}
                style={{ width, height: height * 0.55 }}
              />
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(38,38,38,0.7)",
                  "rgba(38,38,38,1)",
                ]}
                style={{ width, height: height * 0.8 }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                className="absolute bottom-0"
              />
            </View>
            <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
              <Text className="text-white text-center text-3xl font-old tracking-wider">
                {movie?.title}
              </Text>
              {movie?.id ? (
                <Text className="text-neutral-400 font-semibold text-base text-center">
                  {movie?.status} • {movie?.release_date?.split("-")[0]} •{" "}
                  {movie?.runtime} min
                </Text>
              ) : null}

              <View className="flex-row justify-center mx-4 space-x-2">
                {movie?.genres?.map((genre, index) => {
                  let showDot = index + 1 != movie.genres.length;
                  return (
                    <Text
                      key={index}
                      className="text-neutral-400 font-semibold text-base text-center"
                    >
                      {genre?.name} {showDot ? "•" : null}
                    </Text>
                  );
                })}
              </View>

              <Text className="text-neutral-400 mx-4 tracking-wide">
                {movie?.overview}
              </Text>
              <Cast navigation={navigation} cast={cast} />
              <MovieList
                title="Similar Movies"
                hideSeeAll={true}
                data={similiarMovies}
              />
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default MovieScreen;
