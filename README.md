# Task Manager

Task Manager is a web application built with Next.js and React Query to manage tasks efficiently. Users can create, update, and delete tasks while ensuring real-time UI updates without reloading the page.

## Features

- User authentication with session-based access.
- Create, edit, and delete tasks.
- Toggle task completion status.
- Real-time updates using React Query.
- Backend powered by Next.js API routes and Prisma ORM.

## Technologies Used

- Next.js
- React Query
- Prisma ORM
- TypeScript
- Tailwind CSS

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sammsts/Task-Manager.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Task-Manager
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up the database using Prisma:
   ```bash
   npx prisma migrate dev
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- Click on a task to toggle its completion status.
- Add new tasks using the input field.
- Remove tasks by clicking the delete button.
- The UI updates automatically without needing a refresh.

## About
Developed for academic purposes as part of the "Development Laboratory" course in the Computer Science program.