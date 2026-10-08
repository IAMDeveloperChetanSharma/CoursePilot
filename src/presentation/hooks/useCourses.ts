import { useCallback, useState } from 'react';
import type { Course } from '@/domain/models/course';
import { CourseRepositoryImpl } from '@/data/repositories/courseRepositoryImpl';
import { calculateProgress } from '@/domain/usecases/progress';

const repository = new CourseRepositoryImpl();

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setCourses(await repository.getCourses());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load courses.');
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleLesson = useCallback(async (courseId: number, lessonId: number) => {
    setCourses((current) => {
      const next = current.map((course) => {
        if (course.id !== courseId) return course;
        const lessonList = course.lessonList.map((lesson) =>
          lesson.id === lessonId ? { ...lesson, completed: !lesson.completed } : lesson,
        );
        return {
          ...course,
          lessonList,
          progress: calculateProgress(lessonList),
        };
      });
      void repository.saveCourses(next);
      return next;
    });
  }, []);

  return { courses, loading, error, loadCourses, toggleLesson };
}
