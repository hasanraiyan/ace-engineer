import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import Screens
import HomeScreen from "./screens/HomeScreen";
import SemesterScreen from "./screens/SemesterScreen";
import SubjectScreen from "./screens/SubjectScreen";
import SyllabusScreen from "./screens/SyllabusScreen"; // Consider using lazy loading for screens

// Import Context Provider
import { DataProvider } from "./context/DataProvider";

const Stack = createNativeStackNavigator();

const App = () => {

    return (
        <DataProvider>
            <NavigationContainer >
                <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={
                        {
                            headerShown: false,
                        }
                    }>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Semester" component={SemesterScreen} />
                    <Stack.Screen name="Subject" component={SubjectScreen} />
                    <Stack.Screen name="Syllabus" component={SyllabusScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </DataProvider>
    )
}

export default App
