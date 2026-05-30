# Login Page and Backend Details

This document outlines the architecture, technologies, and implementation details for the backend and the login page of the **Krishi Bandhu** application.

## 1. Backend Architecture

The backend of Krishi Bandhu leverages a modern, serverless-friendly stack utilizing Next.js Server Actions, Supabase for authentication, and Prisma as the ORM.

### Database & ORM
- **Database Provider**: PostgreSQL (via Supabase).
- **ORM**: Prisma (`prisma/schema.prisma`).
- **Models**:
  - **`FarmerProfile`**: Stores user-specific farmer details (e.g., name, district, zone, soil type, land size, crops, irrigation status). It includes a relation to `userId` from Supabase Auth to ensure data privacy.
  - **`FarmActivityLog`**: Stores activity logs related to a specific `FarmerProfile` (e.g., Sowing, Watering, Fertilizer), allowing users to maintain a history of their farm operations.

### Authentication
- **Provider**: Supabase Auth.
- **Middleware (`src/middleware.ts`)**: 
  - Protects routes by checking the user's session status.
  - Unauthenticated users attempting to access the root (`/`) are redirected to `/login`.
  - Authenticated users attempting to access `/login` are redirected to the root dashboard (`/`).
- **Auth Actions (`src/app/login/actions.ts`)**: 
  - Provides Next.js server actions (`login` and `signup`) to securely interact with the Supabase client and manage authentication states without exposing credentials to the client.

### Server Actions (API Layer)
All core database and AI interactions are securely handled via Next.js Server Actions in `src/server/actions.ts`:
- **Profile Management**: `createProfile`, `getProfiles`, `deleteProfile`. These functions enforce strict authorization checks, ensuring users can only fetch or modify their own profiles based on their Supabase `user.id`.
- **Activity Logs**: `addLogEntry`, `getLogs`, `deleteLogEntry`. These functions handle the creation and retrieval of farm logs linked to specific farmer profiles.
- **AI Integration**: `askAI`, `getAIAdvisory`. These actions fetch contextual farmer data from the database and pass it securely to the Gemini API (`askKrishiSakhi` and `getProactiveAdvisory`) to provide personalized, intelligent farming advice.

---

## 2. Login Page Implementation

The login page (`src/app/login/page.tsx`) is designed to be highly responsive, modern, and visually appealing, establishing a premium first impression for the users.

### Design Aesthetics & UI
- **Theme**: A nature-inspired color palette utilizing a gradient background (`from-[#e6f4ea] to-white`) and rich emerald green accents (`#1B835E`).
- **Layout**: 
  - Features a split-screen design on larger displays (grid layout).
  - The left side houses the authentication form within an elevated, soft-shadowed card.
  - The right side features elegant typography, a meaningful quote, and application details, layered over a subtle geometric network pattern.
- **Visuals**: Includes a custom dot-grid background and network SVGs to create a dynamic, modern feel. The Krishi Bandhu logo is represented by a `Sprout` icon from Lucide-react.

### Functionality & UX
- **Toggleable Modes**: Users can seamlessly switch between "Sign In" and "Create Account" modes without navigating to a different route.
- **Client-Side Interactivity**: Uses React's `useState` to manage form states, loading indicators, and error messages.
- **Form Submission**: 
  - Prevents default form submission and utilizes Next.js Server Actions (`login` or `signup` from `actions.ts`) to handle authentication.
  - Includes a loading state that disables the submit button and displays a spinner during authentication requests.
- **Error Handling**: Gracefully catches and displays authentication errors (e.g., invalid credentials, user already exists) in a beautifully styled, animated alert box.
