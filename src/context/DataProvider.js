import React, { createContext, useState, useEffect } from 'react'
import useFetchData from '../hooks/useFetchData'

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const { data, getData, loading, error } = useFetchData();
    const [stateData, setStateData] = useState(null);

    // Ensure React re-renders when `data` updates
    useEffect(() => {
        console.log("🔄 Updating stateData in DataProvider...");
        setStateData(data);
    }, [data]);


    return (
        <DataContext.Provider value={{ data: stateData, loading, error, refreshData: getData }}>
            {children}
        </DataContext.Provider>
    )
}