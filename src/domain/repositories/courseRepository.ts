import type { Course } from '../models/course';

export interface CourseRepository {
  getCourses(): Promise<Course[]>;
  refreshCourses(): Promise<Course[]>;
  saveCourses(courses: Course[]): Promise<void>;
}
