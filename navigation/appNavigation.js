import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screen/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieScreen from "../screen/MovieScreen";
import PersonScreen from "../screen/PersonScreen";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Movie"
          options={{ headerShown: false }}
          component={MovieScreen}
        />
        <Stack.Screen
          name="Person"
          options={{ headerShown: false }}
          component={PersonScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
