# SIH 2025 Project

This project is a full-stack application with a React frontend and an Express.js backend.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)

## Features

### Frontend:
- User authentication (Login, Register)
- Dashboard
- Chatbot
- Resources
- Forum
- Contact page
- Pricing page
- Solutions page
- Personal profile page
- Responsive design

### Backend:
- RESTful API endpoints
- CORS enabled
- Environment variable support

## Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool for modern web projects.
- **TypeScript**: A superset of JavaScript that adds static typing.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Radix UI**: A collection of unstyled, accessible UI components.
- **React Router DOM**: Declarative routing for React.
- **TanStack Query**: For data fetching, caching, and synchronization.
- **Zod**: TypeScript-first schema declaration and validation library.
- **Framer Motion**: A production-ready motion library for React.

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express.js**: A fast, unopinionated, minimalist web framework for Node.js.
- **TypeScript**: For type-safe backend development.
- **Dotenv**: To load environment variables from a .env file.
- **CORS**: Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

### Development Tools
- **Vitest**: A blazing fast unit-test framework powered by Vite.
- **Prettier**: An opinionated code formatter.

## Getting Started
Follow these instructions to set up and run the project locally.

### Prerequisites
- Node.js (v18 or higher)
- pnpm (or npm/yarn)

### Installation
1. Clone the repository:
```bash
git clone https://github.com/your-username/sih-2025.git
cd sih-2025
```

2. Install dependencies:
```bash
pnpm install
```

### Running the Application
1. Start the development server:
```bash
pnpm dev
```
This will start both the frontend and backend development servers.

2. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## Project Structure
```text
.
├── client/              # Frontend (React, Vite, TypeScript)
│   ├── components/      # Reusable UI components
│   ├── pages/           # React pages/views
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   └── global.css       # Global styles
├── server/              # Backend (Express.js, TypeScript)
│   ├── routes/          # API route handlers
│   └── index.ts         # Backend entry point
├── public/              # Static assets
├── .env                 # Environment variables
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite frontend configuration
└── vite.config.server.ts # Vite backend configuration
```

## Available Scripts
In the project directory, you can run:

- `pnpm dev`: Starts the development server for both frontend and backend.
- `pnpm build`: Builds the client and server for production.
- `pnpm build:client`: Builds the frontend client.
- `pnpm build:server`: Builds the backend server.
- `pnpm start`: Starts the production server.
- `pnpm test`: Runs tests using Vitest.
- `pnpm format.fix`: Formats code using Prettier.
- `pnpm typecheck`: Checks TypeScript types.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue.
