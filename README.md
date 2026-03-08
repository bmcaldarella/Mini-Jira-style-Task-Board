# Mini Jira Style Task Board

A lightweight Jira-style task management board built with **React, TypeScript, Node.js, and Express**.

This project demonstrates a simple full-stack application where users can manage tasks across different workflow stages such as **To Do, In Progress, and Done**.

The goal of this project is to showcase how a frontend application communicates with a backend API to perform CRUD operations and manage application state.

---

# Live Demo

Frontend  
https://mini-jira-front.netlify.app

Backend API  
https://mini-jira-api.onrender.com

---

# Project Overview

Mini Jira is a simplified version of a task management system similar to Jira or Trello.

Users can create tasks and move them between different workflow columns to track progress.

This project demonstrates:

- Frontend state management
- REST API communication
- Separation of frontend and backend services
- Full CRUD operations
- Basic project structure for scalable applications

---

# Features

- Create new tasks
- Edit existing tasks
- Delete tasks
- Move tasks between columns
- View tasks grouped by status
- Full CRUD operations via REST API

---

# Tech Stack

Frontend

- React
- TypeScript
- Vite
- TailwindCSS

Backend

- Node.js
- Express
- REST API

Development Tools

- Git
- GitHub
- Netlify (frontend deployment)
- Render (backend deployment)

---

# Project Structure
Mini-Jira-style-Task-Board
│
├── mini-jira-front → React frontend
├── mini-jira-back → Express backend API
└── README.md


---

# How to Run the Project Locally

## 1. Clone the repository
git clone https://github.com/bmcaldarella/Mini-Jira-style-Task-Board.git

---

## 2. Run the backend
cd mini-jira-back
npm install
npm run dev


Backend will run on:
http://localhost:3000


---

## 3. Run the frontend
cd mini-jira-front
npm install
npm run dev


Frontend will run on:
http://localhost:5173


---

# API Endpoints

Tasks
GET /tasks
POST /tasks
PUT /tasks/:id
DELETE /tasks/:id


Example request:
{
"title": "Create login page",
"status": "todo"
}


---

# Why This Project?

This project was built to demonstrate:

- Full-stack JavaScript development
- Communication between frontend and backend
- REST API design
- Application state management

It simulates a simplified version of task management tools used in real development teams.

---

# Author

Brandon Michel Caldarella  
Software Development Student  
Ireland
