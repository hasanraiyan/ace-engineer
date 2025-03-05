// import { useState, useEffect } from 'react';
// import useLocalStorage from '../hooks/useLocalStorage';
// import useNetworkStatus from '../hooks/useNetworkStatus';
// import { DATA_URL, STORAGE_KEY } from '../constants/constants';

// const useFetchData = () => {
//     const { getItem, setItem } = useLocalStorage();
//     const isConnected = useNetworkStatus();
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     // Function to fetch data from cache
//     const fetchFromCache = async () => {
//         const cachedData = await getItem(STORAGE_KEY);
//         if (cachedData) {
//             setData(cachedData);
//             console.log('Data loaded from cache.');
//         }
//     };

//     // Function to fetch from remote and cache it
//     const fetchFromRemote = async () => {
//         if (!isConnected) {
//             setError('No internet connection.');
//             return;
//         }

//         setLoading(true);
//         try {
//             const response = await fetch(DATA_URL);
//             if (!response.ok) {
//                 throw new Error(`Network error: ${response.status}`);
//             }
//             const fetchedData = await response.json();
//             await setItem(STORAGE_KEY, fetchedData); // Cache the new data
//             setData(fetchedData);
//             console.log('Data fetched from remote and stored.');
//         } catch (err) {
//             setError(err.message);
//             console.error('Error fetching data:', err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Function to get data (first tries cache, then remote)
//     const getData = async () => {
//         setError(null);
//         setLoading(true);

//         const cachedData = await getItem(STORAGE_KEY);
//         if (cachedData) {
//             setData(cachedData);
//             console.log('Data loaded from cache.');
//         }

//         if (!cachedData) { // ✅ Now correctly checking cache result, not `data`
//             console.log('Fetching data from remote...');
//             await fetchFromRemote();
//         }

//         setLoading(false);
//     };


//     return { data, getData, loading, error };
// };

// export default useFetchData;


import { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import useNetworkStatus from '../hooks/useNetworkStatus';
import { DATA_URL, STORAGE_KEY } from '../constants/constants';

const useFetchData = () => {
    const { getItem, setItem } = useLocalStorage();
    const isConnected = useNetworkStatus();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to fetch data from cache
    const fetchFromCache = async () => {
        console.log("🟡 Fetching data from cache...");
        const cachedData = await getItem(STORAGE_KEY);
        console.log("🟢 Cached Data:", cachedData);
        if (cachedData) {
            setData(cachedData);
            console.log("✅ Data loaded from cache.");
        } else {
            console.log("❌ No data in cache.");
        }
    };

    // Function to fetch from remote and cache it
    const fetchFromRemote = async () => {
        if (!isConnected) {
            console.log("🚫 No internet connection.");
            setError('No internet connection.');
            return;
        }

        setLoading(true);
        console.log("🌍 Fetching data from remote...");
        try {
            const response = await fetch(DATA_URL);
            if (!response.ok) {
                throw new Error(`Network error: ${response.status}`);
            }
            const fetchedData = await response.json();
            console.log("✅ Data fetched from remote:", fetchedData);

            await setItem(STORAGE_KEY, fetchedData); // Cache the new data
            setData(fetchedData);
            console.log("📝 Data stored in cache.");
        } catch (err) {
            console.error("❌ Error fetching data:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Function to get data (first tries cache, then remote)
    const getData = async () => {
        console.log("🔄 Running getData()...");
        setError(null);
        setLoading(true);

        await fetchFromCache();

        // ✅ Check cached data directly
        const cachedData = await getItem(STORAGE_KEY);
        if (!cachedData) {
            console.log('🔵 No cache found, fetching from remote...');
            await fetchFromRemote();
        } else {
            console.log('✅ Using cached data.');
        }

        setLoading(false);
    };

    useEffect(() => {
        console.log("🆕 useFetchData mounted. Running getData()...");
        getData();
    }, []);

    useEffect(() => {
        console.log("🟢 Data updated in state:", data);
    }, [data]);

    return { data, getData, loading, error };
};

export default useFetchData;
