import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/presentation/navigation/types';
import { colors, spacing } from '@/core/theme';
import { useCourses } from '@/presentation/hooks/useCourses';
import StateView from '@/presentation/components/StateView';

type Props = NativeStackScreenProps<RootStackParamList, 'CourseDetails'>;

export default function CourseDetailsScreen({ route }: Props) {
  const { courses, loading, error, loadCourses, toggleLesson } = useCourses();

  useFocusEffect(
    useCallback(() => {
      void loadCourses();
    }, [loadCourses]),
  );

  const course = courses.find((item) => item.id === route.params.courseId);
  if (loading && !course) return <View style={styles.center}><ActivityIndicator size="large" color={colors.primary} /></View>;
  if (!course) return <StateView title="Course unavailable" message={error ?? 'We could not find this course.'} actionLabel="Retry" onAction={() => void loadCourses()} />;

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>{course.title}</Text>
      <Text style={styles.instructor}>Instructor: {course.instructor}</Text>
      <View style={styles.progressCard}>
        <Text style={styles.progressLabel}>Current progress</Text>
        <Text style={styles.progress}>{course.progress}%</Text>
        <View style={styles.track}><View style={[styles.fill, { width: `${course.progress}%` }]} /></View>
      </View>
      <Text style={styles.sectionTitle}>Lessons</Text>
      <View style={styles.lessonList}>
        {course.lessonList.map((lesson) => (
          <Pressable key={lesson.id} onPress={() => void toggleLesson(course.id, lesson.id)} style={styles.lesson}>
            <View style={[styles.checkbox, lesson.completed && styles.checkboxDone]}><Text style={styles.check}>{lesson.completed ? '✓' : ''}</Text></View>
            <View style={styles.lessonCopy}><Text style={[styles.lessonTitle, lesson.completed && styles.completed]}>{lesson.title}</Text><Text style={styles.status}>{lesson.completed ? 'Completed' : 'Pending'}</Text></View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg },
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
  instructor: { color: colors.muted, marginTop: 4 },
  progressCard: { backgroundColor: colors.surface, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: spacing.md, marginTop: spacing.lg },
  progressLabel: { color: colors.muted, fontWeight: '600' },
  progress: { color: colors.text, fontSize: 32, fontWeight: '800', marginVertical: spacing.xs },
  track: { height: 9, backgroundColor: '#E6EAF1', borderRadius: 9, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: colors.primary, borderRadius: 9 },
  sectionTitle: { color: colors.text, fontSize: 20, fontWeight: '800', marginTop: spacing.xl, marginBottom: spacing.sm },
  lessonList: { backgroundColor: colors.surface, borderRadius: 16, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  lesson: { minHeight: 72, paddingHorizontal: spacing.md, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.border },
  checkbox: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  checkboxDone: { borderColor: colors.success, backgroundColor: colors.successSoft },
  check: { color: colors.success, fontWeight: '900' },
  lessonCopy: { marginLeft: spacing.md, flex: 1 },
  lessonTitle: { color: colors.text, fontSize: 15, fontWeight: '700' },
  completed: { color: colors.muted, textDecorationLine: 'line-through' },
  status: { color: colors.muted, fontSize: 12, marginTop: 3 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
