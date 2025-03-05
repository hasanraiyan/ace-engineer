import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import useLocalStorage from "./hooks/useLocalStorage";

const App = () => {
    const { setItem, getItem, removeItem } = useLocalStorage();
    const [storedValue, setStoredValue] = useState(null);

    const handleSave = async () => {
        await setItem("user", { name: "Raiyan", age: 22 }); // Add error handling
    };

    const handleRetrieve = async () => {
        const value = await getItem("user"); // Add error handling
        setStoredValue(value);
    };

    const handleRemove = async () => {
        await removeItem("user");
        setStoredValue(null);
    };

    return (
        <View style={{ padding: 20 }}>
            <Button title="Save Data" onPress={handleSave} />
            <Button title="Retrieve Data" onPress={handleRetrieve} />
            <Button title="Remove Data" onPress={handleRemove} />
            <Text>Stored Value: {storedValue ? JSON.stringify(storedValue) : "No data"}</Text>
        </View>
    );
};

export default App;
