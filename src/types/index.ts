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

export interface Preparation {
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

export interface Component {
  id: string;
  description?: string;
  preparations?: Preparation[];
}

export interface Dish {
  id?: string;
  slug: string;
  description: string;
  inspiration?: string[];
  components?: Component[];
  error?: string;
}

export interface DishRef {
  slug: string;
  description: string;
}

export interface Course {
  name: string;
  description?: string;
  plating?: string;
  dishes: string[] | Dish[];
  duration?: string;
  hidden?: boolean;
  first_course?: boolean;
}

export interface Errand {
  name: string;
  time?: string;
  duration?: string;
}

export interface Menu {
  name: string;
  start_time?: string;
  slug?: string;
  date?: string;
  courses: Course[];
  errands?: Errand[];
}

export function isMenu(v: unknown): v is Menu {
  if (typeof v !== 'object' || v === null) {
    return false;
  }
  const m = v as Partial<Menu>;
  return typeof m.name === 'string' && Array.isArray(m.courses);
}
