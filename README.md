# Sandbox Workspace

A modern React + TypeScript web application built with Vite and Tailwind CSS. This project provides a pre-configured development environment with a rich set of libraries for building interactive, animated, and data-driven web applications.

## 🚀 Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | React | 18.2.0 |
| **Language** | TypeScript | 5.7.0 |
| **Build Tool** | Vite | 6.3.5 |
| **Styling** | Tailwind CSS | 4.1.7 |
| **Routing** | React Router DOM | 6.8.0 |
| **Backend** | Supabase | 2.98.0 |
| **Animations** | Framer Motion | 11.16.1 |
| **Charts** | Recharts | 2.10.0 |
| **Icons** | Lucide React | 0.294.0 |
| **Drag & Drop** | DnD Kit | 6.1.0 / 8.0.0 |
| **Date Utilities** | date-fns | 2.30.0 |
| **Effects** | Canvas Confetti | 1.9.3 |
| **IDs** | uuid | 9.0.1 |

## 📁 Project Structure

```
├── index.html          # Entry HTML with theme support (dark/light)
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.js      # Vite build configuration
└── src/
    ├── main.tsx        # Application entry point
    ├── App.tsx         # Root React component
    └── index.css       # Global styles (Tailwind imports)
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm (v9 or later)

### Installation

```bash
npm install
```

### Development

Start the development server on port 3000:

```bash
npm run dev
```

### Build

Create a production build:

```bash
npm run build
```

### Type Checking

Run TypeScript type checking without emitting files:

```bash
npm run typecheck
```

## ✨ Key Features

### 🎨 Theme Support
The application supports both **light** and **dark** themes with:
- Instant theme application (no flash of unstyled content)
- Iframe-compatible theme messaging (listens for parent window theme changes)
- CSS-based theme switching using `data-theme` attribute and class names

### 📦 Pre-configured Libraries
The project comes with a curated set of libraries ready to use:

- **Framer Motion** — For smooth animations and transitions
- **Recharts** — For data visualization and charting
- **DnD Kit** — For drag-and-drop interactions
- **Lucide React** — For beautiful, consistent iconography
- **Supabase** — For backend services (auth, database, storage)
- **Canvas Confetti** — For celebration effects and micro-interactions
- **date-fns** — For lightweight date manipulation
- **React Router DOM** — For client-side routing

## 🔧 Configuration

### Vite
- Dev server runs on `0.0.0.0:3000` (accessible from network)
- HMR (Hot Module Replacement) enabled on port 3000
- React and Tailwind CSS plugins pre-configured

### TypeScript
- Strict mode enabled
- ES2020 target with bundler module resolution
- JSX support via `react-jsx` transform

### Tailwind CSS
- Tailwind CSS v4 with Vite plugin integration
- Import via `@import "tailwindcss"` in `src/index.css`

## 📝 License

Private project — not for distribution.
