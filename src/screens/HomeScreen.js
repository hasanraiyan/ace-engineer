import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { DataContext } from '../context/DataProvider';
import styles from '../styles/style';
import useNetworkStatus from '../hooks/useNetworkStatus';

const HomeScreen = ({ navigation }) => {

    const { data, loading, error, refreshData } = useContext(DataContext);
    console.warn("Data: ", data)
    const isConnected = useNetworkStatus();

    const [headerHeight, setHeaderHeight] = useState(0);

    const getBranchColor = () => data?.branches[0]?.gradientColors || ['#1976D2', '#42a5f5'];
    const branchColor = getBranchColor();

    const handleRetry = async () => {
        console.log("Retry button clicked");

        if (isConnected) {
            console.log("Device is connected to the internet. Refreshing data...");
            const success = await refreshData();
            console.log("Data refresh status:", success);
        } else {
            console.log("Device is offline. Skipping data refresh.");
        }

        if (success) {
            console.log("Data updated successfully!");
            Alert.alert("Success", "Data updated successfully!");
            setRetryCount(0);
        } else {
            console.log("Data update failed or was not attempted.");
        }
    };

    const BranchCard = ({ branch, onPress }) => {
        return (
            <View style={styles.branchCardContainer}>
                <TouchableOpacity style={[styles.branchCard, { borderLeftColor: branch.color }]}
                    activeOpacity={0.9}
                    onPress={onPress} >
                    <View style={[styles.iconContainer, { backgroundColor: branch.color }]}>
                        <FontAwesome5 name={branch.icon} size={26} color="#fff" />
                    </View>
                    <View style={styles.branchInfo}>
                        <Text style={styles.branchName} numberOfLines={1} ellipsizeMode="tail">
                            {branch.name}
                        </Text>
                        <Text style={styles.branchDescription}>{branch.description}</Text>
                    </View>
                    <FontAwesome5 name="chevron-right" size={16} color={branch.color} />
                </TouchableOpacity>
            </View>
        )
    }


    if (error) {
        return (
            <View style={styles.errorContainer}>
                <FontAwesome5 name="exclamation-circle" size={50} color="#FF3B30" />
                <Text style={styles.errorText}>{error}</Text>

                <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={[styles.headerContent, { backgroundColor: branchColor[0] }]} onLayout={(e) => {
                setHeaderHeight(e.nativeEvent.layout.height);
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
                contentContainerStyle={[styles.scrollContent, { marginTop: headerHeight }]}
            >
                {data?.branches?.map((branch, index) => {
                    return (
                        <BranchCard
                            key={index}
                            branch={branch}
                            onPress={() => {
                                if (data) {
                                    navigation.navigate('Semester', { branchName: branch.name, branchId: branch?.id });
                                } else {
                                    console.warn('Data is not yet loaded, navigation prevented.');
                                }
                            }}
                        />
                    )
                })}
                <TouchableOpacity style={[styles.retryButton, { marginTop: 20, alignSelf: 'center' }]} onPress={handleRetry}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </ScrollView>

        </SafeAreaView>
    );
};

export default HomeScreen;
