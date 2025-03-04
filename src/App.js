import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from './screens/HomeScreen';
import SemesterScreen from './screens/SemesterScreen';
import SubjectScreen from './screens/SubjectScreen';
import SyllabusScreen from './screens/SyllabusScreen';

import { DataProvider } from "./context/DataContext";

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
