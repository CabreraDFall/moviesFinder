import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { fallbackPersonPoster, image185 } from "../api/moviedb";

const Cast = ({ cast, navigation }) => {
  let personName = "Keanu Reevis";
  let characterName = "John Wick";
  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                className="mr-4 items-center"
                onPress={() => navigation.navigate("Person", person)}
              >
                <View className="overflow-hidden border rounded-md  border-neutral-500 ">
                  <Image
                    className="rounded-md h-24 w-20"
                    source={{
                      uri:
                        image185(person?.profile_path) || fallbackPersonPoster,
                    }}
                  ></Image>
                </View>

                <Text className="text-white text-xs mt-1">
                  {person?.character.length > 10
                    ? person?.character.slice(0.1) + "..."
                    : person?.character}
                </Text>
                <Text className="text-neutral-400 text-xs mt-1">
                  {personName.length > 10
                    ? personName.slice(0.1) + "..."
                    : personName}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Cast;
