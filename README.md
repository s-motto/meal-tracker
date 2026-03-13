# 🥗 Meal Tracker

> ⚠️ Work in progress. Expect breaking changes, missing features, and rough edges.

I built this for myself after trying a dozen meal tracking apps and feeling overwhelmed by all of them. Too many numbers, too many nudges, too many things competing for attention at once. I wanted something minimal, calm, and personal.

This is that app. It tracks meals, stores recipes, and lets me jot down how I'm feeling each day. Nothing more, for now.

---

## Tech Stack

- **Vite** + **React 19**
- **React Router v7**
- **Tailwind CSS v4** (configured via `@theme` in CSS, no config file)
- **IndexedDB** for recipe images
- **localStorage** for meals, recipes and wellbeing notes
- **uuid** for unique IDs
- **vite-plugin-pwa** for PWA support

---

## Project Structure

```
src/
  components/
    Layout.jsx          # App wrapper with navbar and background
    Navbar.jsx          # Main navigation
    MealForm.jsx        # Add meal form
    RecipeForm.jsx      # Create/edit recipe form
    RecipeSearch.jsx    # Search bar and tag filter
    Toast.jsx           # Temporary notifications
  pages/
    MealLog.jsx         # Daily diary with date navigation
    RecipeList.jsx      # Recipe list with search and filters
    RecipeDetail.jsx    # Recipe detail view
    RecipeEdit.jsx      # Edit existing recipe
  hooks/
    useMeals.js         # Meals CRUD + wellbeing note + localStorage
    useRecipes.js       # Recipes CRUD + localStorage
    useRecipeFilter.js  # Search and tag filter logic
  data/
    models.js           # Factory functions for empty objects
    store.js            # Generic localStorage helpers
  services/
    imageStorage.js     # Image CRUD via IndexedDB
```

---

## Getting Started

```bash
npm install
npm run dev       # development
npm run build     # production build
npm run preview   # preview build (required to test PWA features)
```

Note: PWA features (install prompt, service worker) only work with `npm run preview` or in production, not in dev mode.

---

## Data Models

### Recipe

```js
{
  id: string,
  nome: string,
  ingredienti: [{ nome: string, quantita: string }],
  istruzioni: string,
  calorie: string,
  tags: string[],
  foto: string | null,   // filename only, image stored in IndexedDB
  dataCreazione: string  // YYYY-MM-DD
}
```

### Meal

```js
{
  id: string,
  data: string,          // YYYY-MM-DD
  tipo: string,          // colazione | pranzo | cena | snack
  ricettaId: string | null,
  descrizione: string,
  calorie: string
}
```

### Wellbeing note

```js
{
  'YYYY-MM-DD': string   // one note per day
}
```

---

## Design Decisions

**Calories are not prominent.** Out of sensitivity towards eating disorders, calorie counts are shown in small, understated text and never as a headline figure.

**No `window.confirm`.** All destructive actions use a double-click confirmation pattern (first click shows "Are you sure?", second click executes). More consistent with the app's design language.

**Toast over `alert()`.** All feedback and error messages use the `Toast` component instead of native browser dialogs.

**Images in IndexedDB.** Recipe photos are stored in IndexedDB rather than localStorage (which has a ~5MB limit). The `foto` field on a recipe stores only the filename, making it easy to migrate to cloud storage later by swapping out `imageStorage.js`.

**Separation of concerns.** localStorage logic lives in `store.js`. Hooks handle application logic. Components handle UI only.

---

## Color Palette

```css
--color-primary: #89023e /* Dark Raspberry */ --color-primary-light: #cc7178
  /* Dusty Rose */ --color-blush: #ffd9da /* Soft Blush */
  --color-blush-light: #f3e1dd /* Light Blush */ --color-green: #c7d9b7
  /* Tea Green */;
```

---

## Roadmap

- [ ] User profile (age, weight, height, weekly body measurements)
- [ ] Measurements progress chart (recharts)
- [ ] Barcode scanner with Open Food Facts API
- [ ] Daily macronutrients (protein, carbs, fat) in the diary
- [ ] JSON data export
- [ ] Dark mode
- [ ] Multi-profile support
