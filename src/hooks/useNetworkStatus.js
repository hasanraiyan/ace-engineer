import NetInfo from '@react-native-community/netinfo';

import {useState, useEffect} from 'react'

const useNetworkStatus = () => {
    const [isConnected, setIsConnected] = useState(true);

    useEffect( () => {
        
        // Subscribe to network status changes
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });
        
        // cleanup function
        return () => unsubscribe()
    }, []);


    return isConnected;
}

export default useNetworkStatus;