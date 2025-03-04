import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

const DATA_URL = 'https://raw.githubusercontent.com/hasanraiyan/beu-data/refs/heads/main/data.json';

const HomeScreen = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            // Fetch the data from the url
            const response = await fetch(DATA_URL);

            // Check if the response is valid
            if (!response.ok) {
                throw new Error(`Network response was not ok, status code: ${response.status}`);
            }

            const fetchedData = await response.json();
            setData(fetchedData);
            console.log('Data fetched from remote.');
        } catch (error) {
            // Set error state
            setError(error.message);
            console.error(`Error fetching remote data: ${error}`);
        }
    };

    // Call fetchData when component mounts
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <ScrollView >
            <View >
                {error ? (
                    <Text>Error: {error}</Text>
                ) : (
                    <Text >{data ? JSON.stringify(data, null, 2) : "Loading..."}</Text>
                )}
            </View>
        </ScrollView>
    );
};



export default HomeScreen;
