import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import slugify from 'slugify';
import type { Meal, Recipe, Course, Errand } from '../types/index.ts';

const MEALS_DIR = path.join(process.cwd(), 'meals');

export function normalizeSlug(str: string): string {
  return slugify(str, { lower: true, locale: 'en' });
}

export function getAllMeals(): Meal[] {
  const meals: Meal[] = [];
  try {
    const entries = fs.readdirSync(MEALS_DIR, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const dirPath = path.join(MEALS_DIR, entry.name);
        const dirFiles = fs.readdirSync(dirPath);
        const mealFileName = dirFiles.find(f => f.endsWith('.meal.yaml'));
        if (mealFileName) {
          const mealFile = path.join(dirPath, mealFileName);
          const meal = yaml.load(fs.readFileSync(mealFile, 'utf-8')) as Meal;
          meal.slug = entry.name;
          if (meal.start_time) {
            const dt = new Date(meal.start_time);
            meal.date = dt.toISOString().split('T')[0];
          }
          meals.push(meal);
        }
      }
    }
  } catch (e) {
    console.error('Error loading meals:', (e as Error).message, 'MEALS_DIR:', MEALS_DIR);
  }
  
  return meals.sort((a, b) => new Date(a.start_time ?? 0).getTime() - new Date(b.start_time ?? 0).getTime());
}

export function getMeal(slug: string): Meal | null {
  const mealDir = path.join(MEALS_DIR, slug);
  if (!fs.existsSync(mealDir)) {
    return null;
  }
  
  const dirFiles = fs.readdirSync(mealDir);
  const mealFileName = dirFiles.find(f => f.endsWith('.meal.yaml'));
  if (!mealFileName) {
    return null;
  }
  
  const mealFile = path.join(mealDir, mealFileName);
  const meal = yaml.load(fs.readFileSync(mealFile, 'utf-8')) as Meal;
  meal.slug = slug;
  if (meal.start_time) {
    const dt = new Date(meal.start_time);
    meal.date = dt.toISOString().split('T')[0];
  }
  
  // Load recipes
  meal.courses = meal.courses.map((course: Course) => {
    course.recipes = course.recipes.map((recipeRef: string) => {
      const recipePath = recipeRef.replace('&recipes/', '');
      const normalizedPath = normalizeSlug(recipePath);
      const fullPath = path.join(mealDir, 'recipes', normalizedPath + '.recipe.yaml');
      if (fs.existsSync(fullPath)) {
        const recipe = yaml.load(fs.readFileSync(fullPath, 'utf-8')) as Recipe;
        recipe.slug = normalizedPath;
        return recipe;
      }
      return { id: recipePath, description: 'Recipe not found', error: 'not found', slug: normalizedPath } as Recipe;
    });
    return course;
  });
  
  // Load errands if exists
  const errandsFile = path.join(mealDir, 'errands.yaml');
  if (fs.existsSync(errandsFile)) {
    meal.errands = yaml.load(fs.readFileSync(errandsFile, 'utf-8')) as Errand[];
  }
  
  return meal;
}

export function getRecipe(mealSlug: string, recipeSlug: string): Recipe | null {
  const recipePath = path.join(MEALS_DIR, mealSlug, 'recipes', recipeSlug + '.recipe.yaml');
  if (!fs.existsSync(recipePath)) {
    return null;
  }
  
  const recipe = yaml.load(fs.readFileSync(recipePath, 'utf-8')) as Recipe;
  recipe.slug = recipeSlug;
  return recipe;
}
