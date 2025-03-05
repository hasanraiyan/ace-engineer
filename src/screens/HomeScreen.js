import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import DataContext from '../context/DataContext';
import styles from '../styles/style'


const HomeScreen = ({ navigation }) => {

    // console.log(navigation);


    const { data, loading, error, updateData } = useContext(DataContext);
    const [retryCount, setRetryCount] = useState(0);


    const [headerHeight, setHeaderHeight] = useState(0);
    const scrollContentStyle = {
        marginTop: headerHeight,
    };

    // useEffect(() => {
    //     console.log("Data in HomeScreen:", data);  
    // }, [data]);

    const handleRetry = async () => {
        setRetryCount(retryCount + 1);

        if (retryCount >= 2) {
            Alert.alert(
                "Network Issue",
                "Unable to fetch data. Please check your internet connection or try again later.",
                [{ text: "OK", onPress: () => setRetryCount(0) }]
            );
            return;
        }

        const success = await updateData();

        if (success) {
            Alert.alert("Success", "Data updated successfully!");
            setRetryCount(0);   
        }
    };

    const BranchCard = ({ branch, onPress }) => {
        // console.log(branch)
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

                <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
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
                // console.log(e.nativeEvent.layout.height);
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
                contentContainerStyle={[styles.scrollContent, scrollContentStyle]}
            >
                {data?.branches?.map((branch, index) => {                                                // console.log(branch)

                    console.log([index, branch.name, data]);
                    return (
                        <BranchCard
                            key={index}
                            branch={branch}
                            onPress={() => {
                                if (data) {
                                    navigation.navigate('Semester', { branchName: branch.name, data: data });
                                } else {
                                    console.warn('Data is not yet loaded, navigation prevented.');
                                }
                            }}
                        />

                    )
                })}




            </ScrollView>

            <TouchableOpacity style={styles.floatingBtn} onPress={handleRetry}>
                <FontAwesome5 name="sync-alt" size={24} color="#fff" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};


export default HomeScreen;
