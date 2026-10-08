import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/presentation/navigation/types';
import { colors, spacing } from '@/core/theme';
import { useCourses } from '@/presentation/hooks/useCourses';
import StateView from '@/presentation/components/StateView';

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

export default function DashboardScreen({ navigation }: Props) {
  const { courses, loading, error, loadCourses, refreshCourses } = useCourses();

  // Re-read the repository whenever Dashboard becomes visible. Course Details
  // persists lesson changes to AsyncStorage, so returning here shows the latest progress.
  useFocusEffect(
    useCallback(() => {
      void loadCourses();
    }, [loadCourses]),
  );

  const renderCourse = useCallback(({ item }: { item: (typeof courses)[number] }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.instructor}>with {item.instructor}</Text>
      <View style={styles.progressRow}>
        <View style={styles.track}><View style={[styles.fill, { width: `${item.progress}%` }]} /></View>
        <Text style={styles.progressText}>{item.progress}%</Text>
      </View>
      <Text style={styles.lessons}>{item.lessons} lessons</Text>
      <Text style={styles.continue} onPress={() => navigation.navigate('CourseDetails', { courseId: item.id })}>Continue →</Text>
    </View>
  ), [navigation]);

  if (loading && courses.length === 0) return <View style={styles.center}><ActivityIndicator size="large" color={colors.primary} /><Text style={styles.loading}>Loading courses…</Text></View>;
  if (error && courses.length === 0) return <StateView title="Couldn’t load courses" message={error} actionLabel="Try again" onAction={() => void refreshCourses()} />;
  if (!loading && courses.length === 0) return <StateView title="No courses yet" message="There are no courses available right now." actionLabel="Refresh" onAction={() => void refreshCourses()} />;

  return (
    <FlatList
      data={courses}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderCourse}
      contentContainerStyle={styles.list}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={() => void refreshCourses()} />}
      ListHeaderComponent={<View><Text style={styles.heading}>Your learning dashboard</Text><Text style={styles.subheading}>Pick up where you left off.</Text></View>}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: spacing.lg, gap: spacing.md },
  heading: { color: colors.text, fontSize: 24, fontWeight: '800' },
  subheading: { color: colors.muted, marginTop: 4, marginBottom: spacing.sm },
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: spacing.md },
  title: { color: colors.text, fontSize: 18, fontWeight: '800' },
  instructor: { color: colors.muted, marginTop: 4 },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.md },
  track: { flex: 1, height: 8, borderRadius: 8, backgroundColor: '#E6EAF1', overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: colors.primary, borderRadius: 8 },
  progressText: { width: 42, textAlign: 'right', color: colors.text, fontWeight: '700' },
  lessons: { color: colors.muted, marginTop: spacing.sm },
  continue: { color: colors.primary, fontWeight: '800', marginTop: spacing.md, alignSelf: 'flex-start' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loading: { color: colors.muted, marginTop: spacing.sm },
});
