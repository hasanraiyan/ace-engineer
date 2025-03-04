import React, { createContext, useState, useEffect, Children } from 'react'
import { getData, fetchFromRemote } from '../services/dataService'

const DataContext = createContext();

export const DataProvider = ({ Children }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            const cachedData = await getData();
            if (cachedData) {
                setData(cachedData);
            } else {
                setError('Failed to load data.');
            }
        } catch (err) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    }

    const updateData = async () => {
        setLoading(true);
        setError(null);

        try {
            const updatedData = await fetchFromRemote();
            if (updatedData) {
                setData(updatedData);
            } else {
                setError('Failed to update data. Please try again.');
            }
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false);
        }
    }


    return (
        <DataContext.Provider value={{ data, loading, error, updateData }} >
            {Children}
        </DataContext.Provider>
    )

}

export default DataContext;  