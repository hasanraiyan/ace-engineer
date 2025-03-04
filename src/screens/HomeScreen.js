import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert, Button, ActivityIndicator } from 'react-native';
import { fetchFromRemote, getData } from '../services/dataService'; // Assuming getData fetches data
import { FontAwesome5 } from '@expo/vector-icons';

const HomeScreen = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await getData();
            if (result) {
                setData(result);
            } else {
                setError('Failed to fetch data.');
            }
        } catch (err) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const updateData = async () => {
        Alert.alert(
            'Update Data',
            'Do you want to update the data from the server?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Update',
                    onPress: async () => {
                        setLoading(true);
                        setError(null);

                        try {
                            const updatedData = await fetchFromRemote();
                            if (updatedData) {
                                setData(updatedData); // Update state with new data
                                Alert.alert('Success', 'Data has been updated successfully!');
                            } else {
                                setError('Failed to update data. Please try again.');
                            }
                        } catch (err) {
                            console.error('Error during data update:', err);
                            setError('Failed to update data. Please try again.');
                        } finally {
                            setLoading(false);
                        }
                    },
                },
            ]
        );
    };

    return (
        <ScrollView>
            <View>
                {error ? (
                    <Text>Error: {error}</Text>
                ) : (
                    <>
                        <Button title="Update Data" onPress={updateData} />
                        {loading ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : (
                            <Text>{data ? JSON.stringify(data, null, 2) : 'No data available'}</Text>
                        )}
                    </>
                )}
            </View>
        </ScrollView>
    );
};

export default HomeScreen;