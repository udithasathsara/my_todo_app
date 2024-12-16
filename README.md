#Task Manager Application

-This is a small React application that allows users to manage a list of tasks. Users can add, edit, delete, and mark tasks as completed. Additionally, tasks can be filtered based on their status.

#Features

-Task List: Displays tasks with the following fields
-Task Name
-Description
-Status (Completed/Not Completed)
-Add Task: Users can add new tasks.
-Edit Task: Users can edit existing tasks.
-Delete Task: Users can delete tasks.
-Mark as Completed: Tasks can be marked as completed or not completed.
-Filter Tasks: Users can filter tasks by their status (All, Completed, Not Completed).

#Technologies Used

-Frontend: React with hooks, Tailwind CSS
-Backend: Node.js with Express.js, MySQL

#Prerequisites
-Before running the application, ensure you have the following installed on your system:
-Node.js (v14 or higher)
-MySQL
-Git

#Installation and Setup

#Backend Setup
-Clone the repository:
-git clone <repository-link>
-Navigate to the backend directory:
-cd backend
-Install backend dependencies:
-npm install

#Configure the database:
-Create a MySQL database.
-export DB_File.sql
-Update the database connection details in the index.js file:

const db = mysql.createConnection({
    host: 'localhost',
    port: 'your-port',
    user: 'your-username',
    password: 'your-password',
    database: 'your-database-name',
})


#Run database migrations (if applicable):
-node migrate.js

#Start the backend server:
node index
npm start

The backend will be running at http://localhost:5000.


#Frontend Setup

-Navigate to the frontend directory:
-cd myt_todo_app
-Install frontend dependencies:
-npm install
-Start the frontend development server:
-npm start
-The frontend will be running at http://localhost:5173.

#How to Run the Application
-Start the backend server:
-cd backend
-npm start or node index

-Start the frontend server:
-cd my_todo_app
-npm start or npm run dev
-Open your browser and navigate to http://localhost:5173 to use the application.

