import type { Lesson } from '../models/course';

export function calculateProgress(lessons: Lesson[]): number {
  if (lessons.length === 0) return 0;
  return Math.round((lessons.filter((lesson) => lesson.completed).length / lessons.length) * 100);
}
