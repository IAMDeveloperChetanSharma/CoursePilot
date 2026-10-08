import { calculateProgress } from '@/domain/usecases/progress';

describe('calculateProgress', () => {
  it('calculates percentage from completed lessons', () => {
    expect(calculateProgress([
      { id: 1, title: 'One', completed: true },
      { id: 2, title: 'Two', completed: true },
      { id: 3, title: 'Three', completed: false },
      { id: 4, title: 'Four', completed: false },
    ])).toBe(50);
  });
});
