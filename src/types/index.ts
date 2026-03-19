export type Qty = number | string;

export interface Ingredient {
  name: string;
  qty?: Qty;
  unit?: string;
  note?: string;
  source?: string;
  preparation?: string;
  homemade?: boolean;
}

export interface Step {
  instruction: string;
  ingredients?: Ingredient[];
  equipment?: string[];
  note?: string;
}

export interface Phase {
  id: string;
  description?: string;
  time?: string;
  duration?: string;
  follows?: string[];
  final?: boolean;
  storage?: string;
  ingredients?: Ingredient[];
  steps?: Step[];
}

export interface Recipe {
  id: string;
  slug: string;
  description: string;
  inspiration?: string[];
  phases?: Phase[];
}

export interface RecipeRef {
  slug: string;
  description: string;
}

export interface Course {
  name: string;
  description?: string;
  plating?: string;
  recipes: RecipeRef[];
  duration?: string;
  hidden?: boolean;
  first_course?: boolean;
}

export interface Errand {
  name: string;
  time?: string;
  duration?: string;
}

export interface Meal {
  name: string;
  start_time?: string;
  slug?: string;
  date?: string;
  courses: Course[];
  errands?: Errand[];
}

export function isMeal(v: unknown): v is Meal {
  if (typeof v !== 'object' || v === null) {
    return false;
  }
  const m = v as Partial<Meal>;
  return typeof m.name === 'string' && Array.isArray(m.courses);
}
