import AsyncStorage from '@react-native-async-storage/async-storage';
import { DATA_URL, STORAGE_KEY } from '../constants/constants';

// Function to fetch data from AsyncStorage (local cache)
const fetchFromAsyncStorage = async () => {
    try {
        const cachedData = await AsyncStorage.getItem(STORAGE_KEY);
        return cachedData ? JSON.parse(cachedData) : null;
    } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
        return null;
    }
};

// Function to fetch data from remote and cache it
const fetchFromRemote = async () => {
    try {
        const response = await fetch(DATA_URL);
        if (!response.ok) {
            throw new Error(`Network response was not ok, status code: ${response.status}`);
        }

        const fetchedData = await response.json();

        // Store the fetched data in AsyncStorage
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(fetchedData));
        console.log('Data fetched and cached successfully.',JSON.parse(fetchedData));
        return fetchedData;
    } catch (error) {
        console.error('Error fetching data from remote server:', error);
        return null;
    }
};

// Unified function: Tries cache first, then fetches from remote if necessary
const getData = async () => {
    let data = await fetchFromAsyncStorage();
    if (data) {
        console.log('Data loaded from cache.');
        return data;
    }

    console.log('Fetching data from remote...');
    return await fetchFromRemote();
};

export { getData, fetchFromAsyncStorage, fetchFromRemote };
