
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import useNetworkStatus from "./hooks/useNetworkStatus"; // Import the hook

const App = () => {
    const isConnected = useNetworkStatus(); // Get network status

    return (
        <View style={styles.container}>
            <Text style={[styles.status, isConnected ? styles.online : styles.offline]}>
                {isConnected ? "🟢 Online" : "🔴 Offline"}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: "center",
    },
    status: {
        fontSize: 18,
        fontWeight: "bold",
    },
    online: {
        color: "green",
    },
    offline: {
        color: "red",
    },
});

export default App;
