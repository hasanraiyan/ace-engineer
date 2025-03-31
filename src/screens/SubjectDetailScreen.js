// src/screens/SubjectDetailScreen.js
import React, { useEffect, useMemo, useCallback, memo } from 'react';
import {
  View, Text, ScrollView, SafeAreaView, StyleSheet, Platform,
  TouchableWithoutFeedback, // Import for long press detection
  Alert, // Import for feedback
} from 'react-native';
import Markdown from 'react-native-markdown-display';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard'; // Import Expo Clipboard

import useDataFetching from '../hooks/useDataFetching';
import { fetchSubjectDetails } from '../api';
import { COLORS } from '../styles/theme';
import { getMarkdownStyles } from '../styles/markdownStyles';
import ErrorMessage from '../components/ErrorMessage';

// --- Detail specific skeleton component (Keep as is) ---
const DetailSkeleton = () => (
    // ... (skeleton implementation remains the same)
    <ScrollView style={styles.detailLoadingContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.detailHeaderCard}>
        <View style={styles.detailSkeletonTitle} />
        <View style={[styles.detailSkeletonLine, { width: '50%'}]} />
        <View style={[styles.detailSkeletonLine, { width: '60%', marginTop: 10 }]} />
      </View>
      {[1, 2, 3].map((i) => (
          <View key={i} style={styles.detailSectionCard}>
          <View style={styles.detailSkeletonSubtitle} />
          <View style={styles.detailSkeletonLine} />
          <View style={[styles.detailSkeletonLine, {width: '80%'}]} />
          <View style={[styles.detailSkeletonLine, {width: '70%'}]} />
        </View>
      ))}
    </ScrollView>
);


const SubjectDetailScreenComponent = ({ route, navigation }) => {
  const { branchId, semesterId, subjectCode, subjectName } = route.params;
  const { data: subjectDetails, loading, error, reload } = useDataFetching(
    fetchSubjectDetails, branchId, semesterId, subjectCode
  );

  // Memoize Markdown styles based on current theme
  const markdownStyles = useMemo(() => getMarkdownStyles(COLORS), [COLORS]);

  // --- Long Press Copy Handler using Expo Clipboard ---
  const handleLongPressToCopy = useCallback(async (contentToCopy, contentTypeLabel = 'Content') => {
    if (!contentToCopy || typeof contentToCopy !== 'string' || contentToCopy.trim() === '') {
        // Don't attempt to copy empty content
        return;
    }
    try {
        // Use setStringAsync for Expo Clipboard
        await Clipboard.setStringAsync(contentToCopy);
        Alert.alert(
            'Copied to Clipboard',
            `${contentTypeLabel} has been copied successfully.`
        );
    } catch (e) {
        console.error("Failed to copy text to clipboard", e);
        Alert.alert('Error', 'Could not copy text to clipboard.');
    }
  }, []); // No external dependencies needed for this version

  // --- Helper to Format List as Markdown (Keep as is) ---
  const formatListAsMarkdown = useCallback((items) => {
    // ... (implementation remains the same)
    if (!items || !Array.isArray(items) || items.length === 0) return '';
    return items.map(item => {
        const text = typeof item === 'string' ? item : JSON.stringify(item);
        return `- ${text}`; // Simple Markdown list item
    }).join('\n'); // Join items with newline
  }, []);

  // Memoized helper to render key-value info pairs (Keep as is)
  const renderDetailInfo = useCallback((label, value) => {
    // ... (implementation remains the same)
    if (!value) return null;
    return (
      <View style={styles.detailInfoRow}>
        <Text style={styles.detailInfoLabel}>{label}:</Text>
        <Text style={styles.detailInfoValue}>{value}</Text>
      </View>
    );
  }, []);

  // Memoized helper to render lists within detail sections, with copy functionality (Keep as is)
  const renderDetailList = useCallback((title, items) => {
    if (!items || !Array.isArray(items) || items.length === 0) return null;

    const markdownListString = formatListAsMarkdown(items);

    return (
      <TouchableWithoutFeedback
        onLongPress={() => handleLongPressToCopy(markdownListString, `${title} List`)}
        accessibilityLabel={`Section: ${title}`}
        accessibilityHint={`Long press to copy the ${title} list as Markdown`}
      >
        <View style={styles.detailSectionCard}>
          <Text style={styles.detailSectionTitle}>{title}</Text>
          {items.map((item, index) => (
            <View key={index} style={styles.detailListItemContainer}>
              <FontAwesome5 name="circle" solid size={6} color={COLORS.primary || '#007bff'} style={styles.detailListBullet} />
              <Text style={styles.detailListItemText}>{typeof item === 'string' ? item : JSON.stringify(item)}</Text>
            </View>
          ))}
        </View>
      </TouchableWithoutFeedback>
    );
  }, [COLORS.primary, handleLongPressToCopy, formatListAsMarkdown]); // Keep dependencies

  // Effect: Set navigation title (Keep as is)
  useEffect(() => {
    navigation.setOptions({ title: subjectName || "Subject Details" });
  }, [subjectName, navigation]);

  // --- Render Logic (Keep as is) ---
  if (loading) {
    return <DetailSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={() => reload({ retry: true })} />;
  }

  if (!subjectDetails) {
    return <ErrorMessage message="Subject details could not be loaded." onRetry={() => reload({ retry: true })} />;
  }

  // Data processing after loading/error checks
  const syllabus = subjectDetails.syllabus || {};
  const courseContentMarkdown = syllabus.courseContent || '';

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.detailContentContainer} showsVerticalScrollIndicator={false}>
        {/* Header Info Card (Keep as is) */}
        <View style={styles.detailHeaderCard}>
            {/* ... header content ... */}
            <Text style={styles.detailTitle}>{subjectDetails.name}</Text>
            {renderDetailInfo("Course Code", subjectDetails.course_code)}
            <View style={styles.detailMetaContainer}>
                <View style={styles.detailMetaBadge}>
                  <FontAwesome5 name="star" solid size={12} color={COLORS.primary || '#007bff'} />
                  <Text style={styles.detailMetaBadgeText}>{`${subjectDetails.credits || '?'} Credits`}</Text>
                </View>
                <View style={styles.detailMetaBadge}>
                  <FontAwesome5 name={subjectDetails.type === 'Theory' ? 'book' : 'flask'} solid size={12} color={COLORS.primary || '#007bff'} />
                  <Text style={styles.detailMetaBadgeText}>{subjectDetails.type || 'Unknown Type'}</Text>
                </View>
            </View>
        </View>

        {/* Syllabus Sections (Keep as is) */}
        {renderDetailList("Course Objectives", syllabus.courseObjectives)}
        {renderDetailList("Learning Outcomes", syllabus.learningOutcomes)}

        {/* Markdown Content - with copy (Keep as is) */}
        {courseContentMarkdown && (
            <TouchableWithoutFeedback
                onLongPress={() => handleLongPressToCopy(courseContentMarkdown)}
                accessibilityLabel="Section: Course Content"
                accessibilityHint="Long press to copy course content as Markdown"
            >
                <View style={styles.detailSectionCard}>
                    <Text style={styles.detailSectionTitle}>Course Content</Text>
                    <Markdown style={markdownStyles}>{courseContentMarkdown}</Markdown>
                </View>
            </TouchableWithoutFeedback>
        )}

        {renderDetailList("Reference Books", syllabus.referenceBooks)}
        {renderDetailList("Assessment Methods", syllabus.assessmentMethods)}

        {/* Bottom Padding (Keep as is) */}
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles specific to SubjectDetailScreen (Keep as is)
const styles = StyleSheet.create({
    screenContainer: { flex: 1, backgroundColor: COLORS.background || '#f8f9fa' }, // Added fallback
    detailContentContainer: { paddingBottom: 40, paddingTop: 10 },
    detailLoadingContainer: { flex: 1, backgroundColor: COLORS.background || '#f8f9fa', paddingTop: 10, paddingHorizontal: 16 },
    // --- Skeleton Styles ---
    detailSkeletonTitle: { width: '70%', height: 24, backgroundColor: COLORS.skeletonHighlight || '#e0e0e0', borderRadius: 6, marginBottom: 15, },
    detailSkeletonSubtitle: { width: '40%', height: 18, backgroundColor: COLORS.skeletonHighlight || '#e0e0e0', borderRadius: 5, marginBottom: 12, },
    detailSkeletonLine: { width: '90%', height: 14, backgroundColor: COLORS.skeleton || '#f0f0f0', borderRadius: 4, marginBottom: 10, },
    // --- Card & Content Styles ---
    detailHeaderCard: {
      backgroundColor: COLORS.card || '#ffffff', borderRadius: 12, padding: 20, marginHorizontal: 16, marginBottom: 16,
      ...Platform.select({ ios: { shadowColor: COLORS.cardShadow || '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.08, shadowRadius: 6, }, android: { elevation: 3, backgroundColor: COLORS.card || '#ffffff', } }),
    },
    detailSectionCard: {
      backgroundColor: COLORS.card || '#ffffff', borderRadius: 12, paddingVertical: 15, paddingHorizontal: 20, marginHorizontal: 16, marginBottom: 16,
      ...Platform.select({ ios: { shadowColor: COLORS.cardShadow || '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.08, shadowRadius: 6, }, android: { elevation: 3, backgroundColor: COLORS.card || '#ffffff', } }),
    },
    detailTitle: { fontSize: 22, fontWeight: Platform.OS === 'ios' ? '700' : 'bold', marginBottom: 10, color: COLORS.text || '#111', lineHeight: 28, },
    detailInfoRow: { flexDirection: 'row', marginBottom: 8, alignItems: 'center', },
    detailInfoLabel: { fontSize: 14, color: COLORS.subtleText || '#666', marginRight: 8, },
    detailInfoValue: { fontSize: 14, color: COLORS.text || '#111', fontWeight: '500', flexShrink: 1, },
    detailMetaContainer: { flexDirection: 'row', marginTop: 12, flexWrap: 'wrap', },
    detailMetaBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.accentBackground || '#eef', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 15, marginRight: 10, marginBottom: 8, },
    detailMetaBadgeText: { fontSize: 12, fontWeight: '500', color: COLORS.primary || '#007bff', marginLeft: 6, },
    detailSectionTitle:{ fontSize: 18, fontWeight: Platform.OS === 'ios' ? '600' : 'bold', marginBottom: 15, color: COLORS.text || '#111', },
    detailListItemContainer: { flexDirection: 'row', marginBottom: 10, alignItems: 'flex-start', },
    detailListBullet: { marginRight: 12, marginTop: Platform.OS === 'ios' ? 8 : 9, color: COLORS.primary || '#007bff'},
    detailListItemText: { flex: 1, fontSize: 15, lineHeight: 22, color: COLORS.text || '#111', },
});

export default memo(SubjectDetailScreenComponent);