# NLW Agents

This is the **frontend** of a project developed during a Rocketseat event, showcasing the use of intelligent agents on the web.

-----

## 🚀 Technologies

  * **React 19.1** - Library for building user interfaces
  * **TypeScript 5.8** - JavaScript superset with static typing
  * **Vite 7.0** - Build tool and development server
  * **TailwindCSS 4.1** - Utility-first CSS framework
  * **React Router Dom 7.6** - Routing library
  * **TanStack React Query 5.8** - Server state management and caching
  * **Radix UI** - Accessible primitive components
  * **Shadcn/ui** - Component system
  * **Lucide React** - Icon library

-----

## 📂 Design Patterns

  * **Component-based Architecture** - React component-based architecture
  * **File-based Routing** - File-based routing with React Router
  * **Server State Management** - Server state management with React Query
  * **Variant-based Components** - Components with variants using CVA
  * **Composition Pattern** - Composition pattern with Radix Slot
  * **Path Aliasing** - Path aliases (`@/` points to `src/`)

-----

## ⚙️ Project Setup

### Prerequisites

  * Node.js (version 18 or higher)
  * npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or yarn install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    # or yarn dev
    ```
4.  Access the application at `http://localhost:5173`

### Available Scripts

  * `npm run dev` - Starts the development server
  * `npm run build` - Generates a production build
  * `npm run preview` - Previews the production build

### Backend

This project consumes an API that should be running on port 3333. Ensure the backend is configured and running before starting the frontend.

-----

## 🛠️ Project Structure

```
src/
├── components/ui/    # User interface components
├── pages/            # Application pages
├── lib/              # Utilities and configurations
└── app.tsx           # Root component
```
