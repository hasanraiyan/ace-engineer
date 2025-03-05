import AsyncStorage from "@react-native-async-storage/async-storage";

const useLocalStorage = () => {
    const setItem = async (key, value) => {
        // Function to save data
        try {
            const formattedValue = typeof value == 'string' ? value : JSON.stringify(value);
            await AsyncStorage.setItem(key, formattedValue);
            return true;
        } catch (error) {
            console.error(`Data save failed ${error}`);
            return false;
        }
    }

    const getItem = async (key) => {
        // Function to retrieve data
        try {
            const value = await AsyncStorage.getItem(key);

            // Ensure the value exist
            if (value === null) return null;

            // Check if the value is a valid JSON (object/array)
            try {
                return JSON.parse(value);
            } catch {
                return value;
            }

        } catch (err) {
            throw new Error(`Not found ${err}`);
        }
    }

    const removeItem = async (key) => {
        // Function to delete data
        try {
            await AsyncStorage.removeItem(key);
            return true;
        } catch (err) {
            console.error(`Unable to delete ${err}`)
            return false;
        }
    }

    return { setItem, getItem, removeItem };
}

export default useLocalStorage;