import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { style } from "nativewind";

const HomeScreen = () => {
  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView>
        <Text className=" text-white text-2xl font-bold">hola</Text>
      </SafeAreaView>
    </View>
  );
};
export default HomeScreen;
