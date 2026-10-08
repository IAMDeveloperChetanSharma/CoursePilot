import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Course } from '@/domain/models/course';

const COURSES_KEY = '@course-pilot/courses-v1';

export async function readCachedCourses(): Promise<Course[] | null> {
  const raw = await AsyncStorage.getItem(COURSES_KEY);
  return raw ? (JSON.parse(raw) as Course[]) : null;
}

export async function writeCachedCourses(courses: Course[]): Promise<void> {
  await AsyncStorage.setItem(COURSES_KEY, JSON.stringify(courses));
}
