import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert, Button, ActivityIndicator, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { fetchFromRemote, getData } from '../services/dataService'; // Assuming getData fetches data
import { FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const HomeScreen = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [headerHeight, setHeaderHeight] = useState(0);
    const scrollContentStyle = {
        marginTop: headerHeight, 
    };
    

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
                                setData(updatedData); 
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


    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2962FF" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        )
    }


    if (error) {
        return (
            <View style={styles.errorContainer}>
                <FontAwesome5 name="exclamation-circle" size={50} color="#FF3B30" />
                <Text style={styles.errorText}>{error}</Text>

                <TouchableOpacity onPress={fetchFromRemote} style={styles.retryButton}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.headerContent} onLayout={(e) => {
                setHeaderHeight(e.nativeEvent.layout.height);
                console.log(e.nativeEvent.layout.height);
            }}>
                <View style={styles.headerTitleContainer}>
                    <FontAwesome5 name="graduation-cap" size={32} color="#fff" style={styles.headerIcon} />
                    <Text style={styles.headerTitle}>{data?.metadata?.appName}</Text>
                </View>
                <Text style={styles.subtitle}>
                    Select Your Branch
                </Text>
                <Text style={styles.welcomeText}>
                    Welcome to your academic resource center. Access course materials, assignments, and more.
                </Text>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.scrollContent,scrollContentStyle]}
            >
                <Text>Data: {JSON.stringify(data)}</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f7f9fc',
        flex: 1
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f9fc'
    },
    loadingText: {
        fontSize: 16,
        marginTop: 10,
        color: '#555'
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f9fc'
    },
    errorText: {
        marginTop: 15,
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: '#2962FF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8
    },

    retryButtonText: {
        color: '#fff',
        fontSize: 16,
    },

    headerContent: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#00B0FF',
        alignItems: 'flex-start',
        paddingTop: 40,
        paddingBottom: 30,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        overflow: 'hidden',
        zIndex: 2
    },
    headerTitleContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'start',
        marginBottom: 8
    },
    headerIcon: {
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
    },
    subtitle: {
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.9)',
    },
    welcomeText: {
        fontSize: 15,
        color: 'rgba(255, 255, 255, 0.8)',
        marginTop: 10,
        lineHeight: 20,
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#f7f9fc',
    },
    scrollContent: {
    }
})
    
export default HomeScreen;