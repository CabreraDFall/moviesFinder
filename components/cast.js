import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const Cast = ({ cast, navigation }) => {
  let personName = "Keanu Reevis";
  let characterName = "John Wick";
  return (
    <View className="my-6">
      {console.log(navigation)}
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
                      uri: "https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200",
                    }}
                  ></Image>
                </View>

                <Text className="text-white text-xs mt-1">
                  {characterName.length > 10
                    ? characterName.slice(0.1) + "..."
                    : characterName}
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
