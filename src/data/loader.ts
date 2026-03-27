import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import slugify from 'slugify';
import type { Menu, Dish, Course, Errand } from '../types/index.ts';

const MEALS_DIR = path.join(process.cwd(), 'meals');

export function normalizeSlug(str: string): string {
  return slugify(str, { lower: true, locale: 'en' });
}

export function getAllMenus(): Menu[] {
  const menus: Menu[] = [];
  try {
    const entries = fs.readdirSync(MEALS_DIR, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const dirPath = path.join(MEALS_DIR, entry.name);
        const dirFiles = fs.readdirSync(dirPath);
        const menuFileName = dirFiles.find(f => f.endsWith('.menu.yaml'));
        if (menuFileName) {
          const menuFile = path.join(dirPath, menuFileName);
          const menu = yaml.load(fs.readFileSync(menuFile, 'utf-8')) as Menu;
          menu.slug = entry.name;
          if (menu.start_time) {
            const dt = new Date(menu.start_time);
            menu.date = dt.toISOString().split('T')[0];
          }
          menus.push(menu);
        }
      }
    }
  } catch (e) {
    console.error('Error loading menus:', (e as Error).message, 'MEALS_DIR:', MEALS_DIR);
  }
  
  return menus.sort((a, b) => new Date(a.start_time ?? 0).getTime() - new Date(b.start_time ?? 0).getTime());
}

export function getMenu(slug: string): Menu | null {
  const menuDir = path.join(MEALS_DIR, slug);
  if (!fs.existsSync(menuDir)) {
    return null;
  }
  
  const dirFiles = fs.readdirSync(menuDir);
  const menuFileName = dirFiles.find(f => f.endsWith('.menu.yaml'));
  if (!menuFileName) {
    return null;
  }
  
  const menuFile = path.join(menuDir, menuFileName);
  const menu = yaml.load(fs.readFileSync(menuFile, 'utf-8')) as Menu;
  menu.slug = slug;
  if (menu.start_time) {
    const dt = new Date(menu.start_time);
    menu.date = dt.toISOString().split('T')[0];
  }
  
  // Load dishes
  menu.courses = menu.courses.map((course: Course) => {
    course.dishes = course.dishes.map((dishRef: string) => {
      const dishPath = dishRef.replace('&dishes/', '');
      const normalizedPath = normalizeSlug(dishPath);
      const fullPath = path.join(menuDir, 'dishes', normalizedPath + '.dish.yaml');
      if (fs.existsSync(fullPath)) {
        const dish = yaml.load(fs.readFileSync(fullPath, 'utf-8')) as Dish;
        dish.slug = normalizedPath;
        return dish;
      }
      return { id: dishPath, description: 'Dish not found', error: 'not found', slug: normalizedPath } as Dish;
    });
    return course;
  });
  
  // Load errands if exists
  const errandsFile = path.join(menuDir, 'errands.yaml');
  if (fs.existsSync(errandsFile)) {
    menu.errands = yaml.load(fs.readFileSync(errandsFile, 'utf-8')) as Errand[];
  }
  
  return menu;
}

export function getDish(menuSlug: string, dishSlug: string): Dish | null {
  const dishPath = path.join(MEALS_DIR, menuSlug, 'dishes', dishSlug + '.dish.yaml');
  if (!fs.existsSync(dishPath)) {
    return null;
  }
  
  const dish = yaml.load(fs.readFileSync(dishPath, 'utf-8')) as Dish;
  dish.slug = dishSlug;
  return dish;
}

export function getAllMeals(): Menu[] {
  return getAllMenus();
}

export function getMeal(slug: string): Menu | null {
  return getMenu(slug);
}
