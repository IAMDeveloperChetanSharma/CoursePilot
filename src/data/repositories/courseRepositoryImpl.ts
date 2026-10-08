import NetInfo from '@react-native-community/netinfo';
import type { Course } from '@/domain/models/course';
import type { CourseRepository } from '@/domain/repositories/courseRepository';
import { fetchCoursesFromApi } from '@/data/api/mockCourses';
import { readCachedCourses, writeCachedCourses } from '@/data/storage/courseStorage';

export class CourseRepositoryImpl implements CourseRepository {
  async getCourses(): Promise<Course[]> {
    const network = await NetInfo.fetch();

    if (!network.isConnected) {
      const cached = await readCachedCourses();
      if (cached) return cached;
      throw new Error('You are offline and no course data is cached yet.');
    }

    try {
      const courses = await fetchCoursesFromApi();
      await writeCachedCourses(courses);
      return courses;
    } catch (error) {
      const cached = await readCachedCourses();
      if (cached) return cached;
      throw error;
    }
  }

  async saveCourses(courses: Course[]): Promise<void> {
    await writeCachedCourses(courses);
  }
}
