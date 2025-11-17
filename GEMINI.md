# GEMINI.md

## Project Overview

This is the frontend for a portfolio website. It's a modern, single-page application built with **React** and **TypeScript**. The project is set up with **Vite** for a fast development experience and uses **Tailwind CSS** for styling. It also includes **GSAP** for animations, specifically for a theme-toggle transition.

The current state of the application features a main page with a title and a theme-toggle button. The theme can be switched between light and dark modes, accompanied by a curtain-like animation.

The project structure is organized into:
- `src/components`: For reusable React components.
- `src/hooks`: For custom React hooks that encapsulate logic (e.g., theme toggling, animations).
- `src/pages`: Intended for different pages of the portfolio.

## Building and Running

To get the project running locally, follow these steps:

1.  **Install Dependencies:**
    Open a terminal in the project root and run:
    ```bash
    npm install
    ```

2.  **Run the Development Server:**
    To start the Vite development server with Hot Module Replacement (HMR):
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or the next available port).

3.  **Build for Production:**
    To create a production-ready build:
    ```bash
    npm run build
    ```
    This command first runs the TypeScript compiler (`tsc`) and then uses Vite to bundle the application. The output will be in the `dist` directory.

4.  **Lint the Code:**
    To check the code for any linting errors and style issues:
    ```bash
    npm run lint
    ```

5.  **Preview the Production Build:**
    To serve the production build locally for testing:
    ```bash
    npm run preview
    ```

## Development Conventions

- **Component-Based Architecture:** The application is built using React functional components.
- **Styling:** Styling is handled by **Tailwind CSS**. A dark mode is implemented and can be toggled.
- **State Management:** Component-level state is managed with React hooks. Custom hooks are used to abstract complex logic (e.g., `useThemeToggle`, `useCurtainAnimation`).
- **Animations:** Animations are implemented using the **GSAP** library.
- **Code Quality:** **ESLint** is configured to maintain code quality and consistency.
- **File Structure:** Source code is organized by feature type (components, hooks, pages) within the `src` directory.
