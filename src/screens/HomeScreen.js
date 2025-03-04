import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert, ActivityIndicator, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import DataContext from '../context/DataContext';


const HomeScreen = ({ navigation }) => {
    const { data, loading, error, updateData } = useContext(DataContext);

    const [headerHeight, setHeaderHeight] = useState(0);
    const scrollContentStyle = {
        marginTop: headerHeight + 20,
    };
    console.log("step 1")
    useEffect(() => {
        console.log("Data in HomeScreen:", data);  
    }, [data]);

    console.log("step 2")
    
    const BranchCard = () => {
        return (
            <TouchableOpacity style={[styles.branchCardContainer, { backgroundColor: 'red', flex: 1, justifyContent: 'center', alignItems: 'center' }]} >
                <Text>{"name not foundms lorem50kfjhdljksfgjksdh kgsdfkh isfdh glksfdhlk sfhk hlkdfhlksfdh gksfdglksdfhgksdfhglksfdhgksfjdhlkdfk p93wthodsfhgksdngksdfvksfdbsfkdgsfkdnksdffbksdfboerhgergoserg kfbksfdblkfdlkdfk fkd kdsfj glksfdhgksfdg lksnvksf nejnvlskdvlksfdjvlksdfv;sdfnvlksf djvksfdnlks dgksdg nksdfglksdfgkdfhbsfkdgsfkdnksdffbksdfboerhgergoserg kfbksfdblkfdlkdfk fkd kdsfj glksfdhgksfdg lksnvksf nejnvlskdvlksfdjvlksdfv;sdfnvlksf djvksfdnlks dgksdg nksdfglksdfgkdfhbsfkdgsfkdnksdffbksdfboerhgergoserg kfbksfdblkfdlkdfk fkd kdsfj glksfdhgksfdg lksnvksf nejnvlskdvlksfdjvlksdfv;sdfnvlksf djvksfdnlks dgksdg nksdfglksdfgkdfhbsfkdgsfkdnksdffbksdfboerhgergoserg kfbksfdblkfdlkdfk fkd kdsfj glksfdhgksfdg lksnvksf nejnvlskdvlksfdjvlksdfv;sdfnvlksf djvksfdnlks dgksdg nksdfglksdfgkdfhbsfkdgsfkdnksdffbksdfboerhgergoserg kfbksfdblkfdlkdfk fkd kdsfj glksfdhgksfdg lksnvksf nejnvlskdvlksfdjvlksdfv;sdfnvlksf djvksfdnlks dgksdg nksdfglksdfgkdfhbsfkdgsfkdnksdffbksdfboerhgergoserg kfbksfdblkfdlkdfk fkd kdsfj glksfdhgksfdg lksnvksf nejnvlskdvlksfdjvlksdfv;sdfnvlksf djvksfdnlks dgksdg nksdfglksdfgkdfhbsfkdgsfkdnksdffbksdfboerhgergoserg kfbksfdblkfdlkdfk fkd kdsfj glksfdhgksfdg lksnvksf nejnvlskdvlksfdjvlksdfv;sdfnvlksf djvksfdnlks dgksdg nksdfglksdfgkdfhbsfkdgsfkdnksdffbksdfboerhgergoserg kfbksfdblkfdlkdfk fkd kdsfj glksfdhgksfdg lksnvksf nejnvlskdvlksfdjvlksdfv;sdfnvlksf djvksfdnlks dgksdg nksdfglksdfgkdfhbsfkdgsfkdnksdffbksdfboerhgergoserg kfbksfdblkfdlkdfk fkd kdsfj glksfdhgksfdg lksnvksf nejnvlskdvlksfdjvlksdfv;sdfnvlksf djvksfdnlks dgksdg nksdfglksdfgkdfhbsfkdgsfkdnksdffbksdfboerhgergoserg kfbksfdblkfdlkdfk fkd kdsfj glksfdhgksfdg lksnvksf nejnvlskdvlksfdjvlksdfv;sdfnvlksf djvksfdnlks dgksdg nksdfglksdfgkdfh"}</Text>
            </TouchableOpacity>
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
                contentContainerStyle={[styles.scrollContent, scrollContentStyle]}
            >
                {data && data.branches && data?.branches?.map((branch, index) => {
                    return (
                        <View key={index}>

                            <BranchCard
                                key={index}
                                branch={branch}
                                onPress={() => {
                                    if (data) {
                                        navigation.navigate('Semester', { branch: branch.name, data: data });
                                    } else {
                                        console.warn('Data is not yet loaded, navigation prevented.');
                                    }
                                }}
                            />

                        </View>
                    )
                })}

                <BranchCard

                />
                {/* <Text>Data: {JSON.stringify(data)}</Text> */}
            </ScrollView>

            <TouchableOpacity style={styles.floatingBtn} onPress={updateData}>
                <FontAwesome5 name="sync-alt" size={24} color="#fff" />
            </TouchableOpacity>
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
    },


})

export default HomeScreen;
