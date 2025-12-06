export interface Habit {
  id: number;
  userId: number;
  title: string;
  type: string;
  start: string;
  restart: string;
  updatedAt: string;
  createdAt: string;
}

export interface NewHabit {
  title: string;
  start: Date;
}

export interface HabitFormState {
  success: boolean | null;
  errors?: {
    title?: string[];
    start?: string[];
    type?: string[];
  };
  message?: string | null;
}
