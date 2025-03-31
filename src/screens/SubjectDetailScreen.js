// src/screens/SubjectDetailScreen.js
import React, { useEffect, useMemo, useCallback, memo } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet, Platform } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { FontAwesome5 } from '@expo/vector-icons';

import useDataFetching from '../hooks/useDataFetching';
import { fetchSubjectDetails } from '../api';
import { COLORS } from '../styles/theme';
import { getMarkdownStyles } from '../styles/markdownStyles';
import ErrorMessage from '../components/ErrorMessage';

// Detail specific skeleton component
const DetailSkeleton = () => (
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

  // Memoized helper to render key-value info pairs
  const renderDetailInfo = useCallback((label, value) => {
    if (!value) return null;
    return (
      <View style={styles.detailInfoRow}>
        <Text style={styles.detailInfoLabel}>{label}:</Text>
        <Text style={styles.detailInfoValue}>{value}</Text>
      </View>
    );
  }, []);

  // Memoized helper to render lists within detail sections
  const renderDetailList = useCallback((title, items) => {
    if (!items || !Array.isArray(items) || items.length === 0) return null;
    return (
      <View style={styles.detailSectionCard}>
        <Text style={styles.detailSectionTitle}>{title}</Text>
        {items.map((item, index) => (
          <View key={index} style={styles.detailListItemContainer}>
            <FontAwesome5 name="circle" solid size={6} color={COLORS.primary} style={styles.detailListBullet} />
            <Text style={styles.detailListItemText}>{typeof item === 'string' ? item : JSON.stringify(item)}</Text>
          </View>
        ))}
      </View>
    );
  }, [COLORS.primary]); // Re-create if primary color changes (theme switch)

  // Effect: Set navigation title
  useEffect(() => {
    navigation.setOptions({ title: subjectName || "Subject Details" });
  }, [subjectName, navigation]);

  // --- Render Logic ---
  if (loading) {
    return <DetailSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={() => reload({ retry: true })} />;
  }

  if (!subjectDetails) {
    // Handle case where API might return success but no data
    return <ErrorMessage message="Subject details could not be loaded." onRetry={() => reload({ retry: true })} />;
  }

  // Data processing after loading/error checks
  const syllabus = subjectDetails.syllabus || {};

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.detailContentContainer} showsVerticalScrollIndicator={false}>
        {/* Header Info Card */}
        <View style={styles.detailHeaderCard}>
            <Text style={styles.detailTitle}>{subjectDetails.name}</Text>
            {renderDetailInfo("Course Code", subjectDetails.course_code)}
            <View style={styles.detailMetaContainer}>
                <View style={styles.detailMetaBadge}>
                  <FontAwesome5 name="star" solid size={12} color={COLORS.primary} />
                  <Text style={styles.detailMetaBadgeText}>{`${subjectDetails.credits || '?'} Credits`}</Text>
                </View>
                <View style={styles.detailMetaBadge}>
                  <FontAwesome5 name={subjectDetails.type === 'Theory' ? 'book' : 'flask'} solid size={12} color={COLORS.primary} />
                  <Text style={styles.detailMetaBadgeText}>{subjectDetails.type || 'Unknown Type'}</Text>
                </View>
            </View>
        </View>

        {/* Syllabus Sections */}
        {renderDetailList("Course Objectives", syllabus.courseObjectives)}
        {renderDetailList("Learning Outcomes", syllabus.learningOutcomes)}

        {/* Markdown Content */}
        {syllabus.courseContent && (
            <View style={styles.detailSectionCard}>
                <Text style={styles.detailSectionTitle}>Course Content</Text>
                {/* Render markdown only if content exists */}
                <Markdown style={markdownStyles}>{syllabus.courseContent}</Markdown>
            </View>
        )}

        {renderDetailList("Reference Books", syllabus.referenceBooks)}
        {renderDetailList("Assessment Methods", syllabus.assessmentMethods)}

        {/* Bottom Padding */}
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles specific to SubjectDetailScreen
const styles = StyleSheet.create({
    screenContainer: { flex: 1, backgroundColor: COLORS.background },
    detailContentContainer: { paddingBottom: 40, paddingTop: 10 },
    detailLoadingContainer: { flex: 1, backgroundColor: COLORS.background, paddingTop: 10, paddingHorizontal: 16 },
    detailHeaderCard: {
      backgroundColor: COLORS.card, borderRadius: 12, padding: 20, marginHorizontal: 16, marginBottom: 16,
      ...Platform.select({ ios: { shadowColor: COLORS.cardShadow, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.08, shadowRadius: 6, }, android: { elevation: 3, backgroundColor: COLORS.card, } }),
    },
    detailSectionCard: {
      backgroundColor: COLORS.card, borderRadius: 12, paddingVertical: 15, paddingHorizontal: 20, marginHorizontal: 16, marginBottom: 16,
      ...Platform.select({ ios: { shadowColor: COLORS.cardShadow, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.08, shadowRadius: 6, }, android: { elevation: 3, backgroundColor: COLORS.card, } }),
    },
    detailTitle: { fontSize: 22, fontWeight: Platform.OS === 'ios' ? '700' : 'bold', marginBottom: 10, color: COLORS.text, lineHeight: 28, },
    detailInfoRow: { flexDirection: 'row', marginBottom: 8, alignItems: 'center', },
    detailInfoLabel: { fontSize: 14, color: COLORS.subtleText, marginRight: 8, },
    detailInfoValue: { fontSize: 14, color: COLORS.text, fontWeight: '500', flexShrink: 1, },
    detailMetaContainer: { flexDirection: 'row', marginTop: 12, flexWrap: 'wrap', },
    detailMetaBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.accentBackground, paddingVertical: 4, paddingHorizontal: 10, borderRadius: 15, marginRight: 10, marginBottom: 8, },
    detailMetaBadgeText: { fontSize: 12, fontWeight: '500', color: COLORS.primary, marginLeft: 6, },
    detailSectionTitle:{ fontSize: 18, fontWeight: Platform.OS === 'ios' ? '600' : 'bold', marginBottom: 15, color: COLORS.text, },
    detailListItemContainer: { flexDirection: 'row', marginBottom: 10, alignItems: 'flex-start', },
    detailListBullet: { marginRight: 12, marginTop: Platform.OS === 'ios' ? 8 : 9, },
    detailListItemText: { flex: 1, fontSize: 15, lineHeight: 22, color: COLORS.text, },
    // Skeleton Styles
    detailSkeletonTitle: { width: '70%', height: 24, backgroundColor: COLORS.skeletonHighlight, borderRadius: 6, marginBottom: 15, },
    detailSkeletonSubtitle: { width: '40%', height: 18, backgroundColor: COLORS.skeletonHighlight, borderRadius: 5, marginBottom: 12, },
    detailSkeletonLine: { width: '90%', height: 14, backgroundColor: COLORS.skeleton, borderRadius: 4, marginBottom: 10, },
});

export default memo(SubjectDetailScreenComponent);