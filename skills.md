```markdown
# Poetry Explorer App – Development Rules (skills.md)

This document defines the development rules and expectations for the **Poetry Explorer App**.  
All code generated for this project should follow these guidelines.

The goal is to produce **clean, maintainable, readable React code** that is appropriate for a UX designer with frontend development experience.

Avoid unnecessary complexity. Favor clarity, simplicity, and modular structure.

---

# Tech Stack

The application must use the following technologies:

- **React**
- **Vite**
- **TypeScript**
- **Chakra UI**
- **React Router**
- **PoetryDB API**
- **localStorage** for persistence

Do NOT introduce additional frameworks or heavy dependencies unless absolutely required.

State management should use:

- React hooks
- component state
- lightweight custom hooks

Avoid adding:

- Redux
- Zustand
- MobX
- other global state libraries

The architecture should remain lightweight.

---

# Application Features

The application includes the following functionality.

## Core Features

- Search poems by **author**
- Search poems by **title**
- Display search results in a readable format
- View full poem details on a dedicated page

## UX Features

- **Poem of the Day**
- **Favorites** saved to localStorage
- Loading states
- Empty states
- Error states
- Responsive layout

Dark mode is **not required**.

---

# Application Architecture

The project should follow a simple modular structure.

```

src/
components/
pages/
hooks/
lib/
types/

```

## components

Reusable UI components.

Examples:

- Header
- PoemCard
- SearchBar
- ResultsList
- PoemOfTheDay

Components should be focused and reusable.

---

## pages

Route-level pages.

Examples:

- HomePage
- PoemDetailPage
- FavoritesPage

Pages compose multiple components together.

---

## hooks

Custom React hooks for shared logic.

Examples:

- useFavorites
- usePoemOfTheDay

Hooks should encapsulate logic that would otherwise be duplicated across components.

---

## lib

Utilities and data layer.

Examples:

- api.ts
- storage.ts

Responsibilities include:

- PoetryDB API calls
- localStorage helpers
- data transformations

Components should not directly call the API.

---

## types

Shared TypeScript types and interfaces.

Example:

```

Poem

```

All shared data structures should be defined here.

---

# Routing Structure

The application uses **React Router**.

Routes should remain simple.

```

/
Home page

/poem/:id
Poem detail page

/favorites
Favorites page

```

The Home page includes:

- Poem of the Day
- Search controls
- Search results

---

# UI Guidelines

All UI components must use **Chakra UI**.

Prefer Chakra primitives such as:

- Box
- Flex
- Stack
- Heading
- Text
- Button
- Input
- Card-style layout using Box or Stack

Avoid writing custom CSS unless absolutely necessary.

Use Chakra spacing tokens to maintain consistent layout rhythm.

---

# Visual Design Principles

The UI should feel like a **modern poetry reader** rather than a generic dashboard.

Design should emphasize:

- whitespace
- calm visual hierarchy
- strong typography
- readable poem layout
- minimal distractions

Poem text must be highly readable with comfortable line spacing.

---

# Component Design

Components should be:

- small
- focused
- reusable

Avoid monolithic components.

Example structure:

```

Header
PoemCard
SearchBar
ResultsList
PoemOfTheDay

````

Prefer composing multiple small components instead of building large components.

Try to keep components under ~200 lines when possible.

---

# TypeScript Rules

All code should use TypeScript.

Define a shared `Poem` type.

Example:

```ts
export interface Poem {
  title: string
  author: string
  lines: string[]
  linecount: string
}
````

Avoid using `any` unless absolutely unavoidable.

Types should be imported from the shared `types` folder when possible.

---

# API Layer

All PoetryDB requests must go through a dedicated API utility.

File location:

```
src/lib/api.ts
```

This file should contain functions such as:

* search poems by author
* search poems by title
* retrieve poem data

Components must NOT call `fetch()` directly.

All API calls should be abstracted behind utility functions.

---

# Poem of the Day

Poem of the Day should persist per day using localStorage.

Implementation logic:

1. Check localStorage for stored poem-of-the-day data.
2. If stored date matches today's date, reuse the saved poem.
3. If the date does not match today, fetch/select a new poem.
4. Save both the poem and today's date.

Recommended storage keys:

```
poetryApp_poemOfTheDay
poetryApp_poemOfTheDay_date
```

The Home page should display:

* poem title
* author
* preview lines
* link to full poem
* optional favorite action

---

# Favorites

Favorites must be stored in localStorage.

Recommended storage key:

```
poetryApp_favorites
```

Favorites functionality must support:

* add poem to favorites
* remove poem from favorites
* list saved poems

Favorites logic should be handled inside a custom hook.

Example:

```
useFavorites
```

Components should call the hook instead of interacting with localStorage directly.

---

# Loading States

Every asynchronous request should display a loading state.

Examples:

* search request loading
* poem-of-the-day loading

Loading states can use Chakra components such as:

* Skeleton
* Spinner
* placeholder cards

---

# Empty States

The UI must gracefully handle empty states.

Examples:

Search results empty:

"No poems matched that search."

Favorites page empty:

"Your saved poems will appear here."

Empty states should feel intentional and user-friendly.

---

# Error Handling

Handle API errors gracefully.

Display simple user-facing messages such as:

"Something went wrong while loading poems."

Avoid displaying raw technical errors in the UI.

---

# Code Generation Rules

When generating code for this project:

1. Only generate the section that is requested.
2. Do not generate unrelated components.
3. Always specify:

   * file names
   * file paths
4. Provide **complete file contents**.
5. Avoid partial snippets.
6. Ensure code compiles in a React + Vite + TypeScript environment.

---

# Performance

Keep the application lightweight.

Avoid unnecessary re-renders.

Use memoization only when needed.

Do not introduce premature optimization.

---

# Accessibility

Follow basic accessibility best practices:

* semantic headings
* descriptive button labels
* keyboard-friendly interactions
* readable contrast

---

# Design Philosophy

The app should feel like a **calm, modern poetry reader**.

Focus on:

* readability
* clean layout
* thoughtful whitespace
* simple interactions
* minimal UI noise

The experience should prioritize the act of **reading poetry**.

```
```