import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const DATA_URL = 'https://raw.githubusercontent.com/hasanraiyan/beu-data/refs/heads/main/data.json';
const STORAGE_KEY = 'app_data_cache';
const HomeScreen = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);


    const fetchData = async () => {
        setError(null);
        setLoading(true);

        try {
            // Try to get data from cache first
            const cachedData = await AsyncStorage.getItem(STORAGE_KEY);

            if (cachedData) {
                const parseCachedData = JSON.parse(cachedData);
                setData(parseCachedData);
                console.log(`Data loaded from the cache`);
                setLoading(false);
                return;
            }

        } catch (cacheError) {
            console.warn("Error accessing local cache, will try fetching from server.");
        }

        // If cache is empty or failed, fetch from network
        try {
            const response = await fetch(DATA_URL);

            if (!response.ok) {
                throw new Error(`Network response was not ok, status code: ${response.status}`);
            }

            const fetchedData = await response.json();
            setData(fetchedData);
            // store the new data
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(fetchedData));
            console.log('Data fetched from remote.');
        } catch (error) {
            setError("Failed to fetch data from server.");
        } finally {
            setLoading(false);
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
