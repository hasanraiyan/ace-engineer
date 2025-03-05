import React, { createContext, useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import useFetchData from '../hooks/useFetchData';
import styles from '../styles/style'
import { FontAwesome5 } from '@expo/vector-icons';


export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const { data, fetchFromRemote, loading, error } = useFetchData();

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2962FF" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }
    if (error) {
        return (
            <View style={styles.errorContainer}>
                <FontAwesome5 name="exclamation-circle" size={50} color="#FF3B30" />
                <Text style={styles.errorText}>{error}</Text>
            </View>
        )
    }

    if (!data) {
        // If data is still null, don't render children yet.
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading Data...</Text>
            </View>
        );
    }

    return (
        <DataContext.Provider value={{ data, loading, error, refreshData: fetchFromRemote }}>
            {children}
        </DataContext.Provider>
    );
};
