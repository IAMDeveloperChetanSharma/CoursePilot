import NetInfo from '@react-native-community/netinfo';
import type { Course } from '@/domain/models/course';
import type { CourseRepository } from '@/domain/repositories/courseRepository';
import { fetchCoursesFromApi } from '@/data/api/mockCourses';
import { readCachedCourses, writeCachedCourses } from '@/data/storage/courseStorage';

export class CourseRepositoryImpl implements CourseRepository {
  /**
   * Returns the local snapshot when one exists. This is important because
   * local lesson progress is the latest user-owned state and must not be
   * overwritten by the static mock API when navigating between screens.
   * The Dashboard's pull-to-refresh explicitly calls refreshCourses().
   */
  async getCourses(): Promise<Course[]> {
    const cached = await readCachedCourses();
    if (cached) return cached;

    return this.refreshCourses();
  }

  /** Fetches the latest server snapshot and refreshes the local cache. */
  async refreshCourses(): Promise<Course[]> {
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
      throw error instanceof Error ? error : new Error('Unable to fetch courses.');
    }
  }

  async saveCourses(courses: Course[]): Promise<void> {
    await writeCachedCourses(courses);
  }
}
