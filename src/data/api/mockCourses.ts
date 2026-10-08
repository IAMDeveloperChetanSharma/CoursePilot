import type { Course } from '@/domain/models/course';

const buildLessons = (titles: string[], total: number, completedCount: number) =>
  Array.from({ length: total }, (_, index) => ({
    id: index + 1,
    title: titles[index] ?? `Lesson ${index + 1}`,
    completed: index < completedCount,
  }));

export const MOCK_COURSES: Course[] = [
  {
    id: 1,
    title: 'Python Programming',
    instructor: 'John Smith',
    progress: 65,
    lessons: 20,
    lessonList: buildLessons(
      ['Introduction', 'Variables & Data Types', 'Functions', 'OOP', 'Modules', 'Testing'],
      20,
      13,
    ),
  },
  {
    id: 2,
    title: 'Generative AI',
    instructor: 'Sarah Williams',
    progress: 40,
    lessons: 16,
    lessonList: buildLessons(
      ['Introduction to GenAI', 'Prompt Engineering', 'Embeddings', 'RAG', 'Agents'],
      16,
      6,
    ),
  },
  {
    id: 3,
    title: 'Full Stack Development',
    instructor: 'David Brown',
    progress: 25,
    lessons: 28,
    lessonList: buildLessons(
      ['Web Fundamentals', 'React', 'APIs', 'Databases', 'Authentication', 'Deployment'],
      28,
      7,
    ),
  },
];

export async function fetchCoursesFromApi(): Promise<Course[]> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return JSON.parse(JSON.stringify(MOCK_COURSES)) as Course[];
}
