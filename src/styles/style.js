import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f4f8',
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
        backgroundColor: '#3498db',
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
        alignItems: 'flex-start',
        paddingTop: 30,
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
    headerSubtitleContainer: {
        marginLeft: 38,
        transform: [{ translateY: -10 }],
    },
    headerIcon: {
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        flexShrink: 1,
    },
    subtitle: {
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.9)',
    },
    welcomeText: {
        fontSize: 15,
        color: 'rgba(255, 255, 255, 0.8)',
        marginTop: 6,
        lineHeight: 20,
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#f7f9fc',
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 20

    },
    scrollContentStyle: { // Consider moving this to styles.js
        marginTop: 0,
    },
    branchCardContainer: {
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    branchCard: {
        flexDirection: 'row',
        alignItems: 'center',

        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        borderLeftWidth: 4
    },

    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16
    },
    branchInfo: {
        flex: 1
    },
    branchName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
        overflow: 'hidden'
    },
    branchDescription: {
        fontSize: 14,
        color: '#777',
        lineHeight: 20
    },
    floatingBtn: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#3498db',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
        zIndex: 2
    },
    backButton: {
        backgroundColor: '#fff',
        height: 38,
        width: 38,
        borderRadius: 19,
        justifyContent: 'center',
        alignItems: 'center',

        transform: [{ translateX: -8 }],
    },
    status: {
        fontSize: 18,
        fontWeight: "bold",
    },
    online: {
        color: "green",
    },
    offline: {
        color: "red",
    },
    semesterButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderRadius: 16,
       
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
        borderLeftWidth: 4,
    },
    semesterInfo: {
        flex: 1,
    },
    semesterText: {
        fontSize: 17,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
    },
    semesterDetails: {
        fontSize: 14,
        color: '#777',
    },
    semesterNumberCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    semesterNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color:'#fff'
    },
    chevron: {
        marginLeft: 5,
    },

})

export default styles;