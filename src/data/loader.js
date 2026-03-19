import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const MEALS_DIR = path.join(process.cwd(), 'meals');

export function getAllMeals() {
  const meals = [];
  try {
    const entries = fs.readdirSync(MEALS_DIR, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const dirPath = path.join(MEALS_DIR, entry.name);
        const dirFiles = fs.readdirSync(dirPath);
        const mealFileName = dirFiles.find(f => f.endsWith('.meal.yaml'));
        if (mealFileName) {
          const mealFile = path.join(dirPath, mealFileName);
          const meal = yaml.load(fs.readFileSync(mealFile, 'utf-8'));
          meal.slug = entry.name;
          meals.push(meal);
        }
      }
    }
  } catch (e) {
    console.error('Error loading meals:', e.message, 'MEALS_DIR:', MEALS_DIR);
  }
  
  return meals.sort((a, b) => new Date(a.date) - new Date(b.date));
}

export function getMeal(slug) {
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
  const meal = yaml.load(fs.readFileSync(mealFile, 'utf-8'));
  meal.slug = slug;
  
  // Load recipes
  meal.courses = meal.courses.map(course => {
    course.recipes = course.recipes.map(recipeRef => {
      const recipePath = recipeRef.replace('&recipes/', '');
      const fullPath = path.join(mealDir, 'recipes', recipePath + '.recipe.yaml');
      if (fs.existsSync(fullPath)) {
        const recipe = yaml.load(fs.readFileSync(fullPath, 'utf-8'));
        recipe.slug = recipePath;
        return recipe;
      }
      return { name: recipePath, error: 'not found' };
    });
    return course;
  });
  
  // Load errands if exists
  const errandsFile = path.join(mealDir, 'errands.yaml');
  if (fs.existsSync(errandsFile)) {
    meal.errands = yaml.load(fs.readFileSync(errandsFile, 'utf-8'));
  }
  
  return meal;
}

export function getRecipe(mealSlug, recipeSlug) {
  const recipePath = path.join(MEALS_DIR, mealSlug, 'recipes', recipeSlug + '.recipe.yaml');
  if (!fs.existsSync(recipePath)) {
    return null;
  }
  
  const recipe = yaml.load(fs.readFileSync(recipePath, 'utf-8'));
  recipe.slug = recipeSlug;
  return recipe;
}