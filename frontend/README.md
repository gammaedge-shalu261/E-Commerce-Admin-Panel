MERN E-Commerce Admin Panel

This is a full-stack e-commerce admin panel built from scratch using the MERN stack (MongoDB, Express, React, Node.js). This project was created as a step-by-step learning guide, focusing on building a secure backend API and a dynamic React frontend to interact with it.

Features

Backend

Secure Authentication: Admin registration and login using JWT (JSON Web Tokens).

Password Encryption: Passwords are securely hashed using bcryptjs before being saved to the database.

Full Product CRUD: Complete API for Creating, Reading, Updating, and Deleting products.

Protected Routes: Middleware secures the Product CRUD endpoints, allowing access only to authenticated admin users.

MongoDB Atlas Integration: Connects to a cloud-hosted MongoDB database.

Frontend

React + Vite: A fast, modern React frontend setup.

Tailwind CSS: Utility-first styling for a clean, responsive UI.

React Router: Full page routing for Login, Dashboard, and Products.

Protected Routes: Frontend routes are protected, redirecting unauthenticated users to the login page.

Token Management: Securely stores the admin's JWT in localStorage and sets it as a default axios header for all API requests.

Product Management:

List Products: Fetches and displays all products in a table.

Create Product: Opens a modal with a form to create a new product.

Delete Product: Opens a confirmation modal before deleting a product.

Reusable Components: Includes a reusable Modal component for forms and confirmations.

Tech Stack

Backend: Node.js, Express, MongoDB (with Mongoose), jsonwebtoken, bcryptjs, dotenv

Frontend: React, Vite, axios, react-router-dom, Tailwind CSS

Getting Started

To get this project running locally, you will need to set up both the backend and the frontend.

1. Backend Setup

# 1. Navigate to the backend folder
cd ecommerce-admin-backend

# 2. Install dependencies
npm install

# 3. Create a .env file in this folder
# Add the following variables:
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key

# 4. Start the backend server
npm start


The server will be running on http://localhost:5000.

2. Frontend Setup

# 1. Open a new terminal and navigate to the frontend folder
cd ecommerce-admin-frontend

# 2. Install dependencies
npm install

# 3. Start the frontend development server
npm run dev


The React app will be running (usually on http://localhost:5173).

Note: The frontend is configured with a proxy in vite.config.js to forward all API requests (starting with /api) to the backend at http://localhost:5000.

Project Structure

This project is organized as a monorepo with two main folders:

ecommerce-project/
├── ecommerce-admin-backend/
│   ├── config/           # Database connection (db.js)
│   ├── controllers/      # Logic for routes (productController.js, authController.js)
│   ├── middleware/       # Custom middleware (authMiddleware.js)
│   ├── models/           # Mongoose schemas (productModel.js, userModel.js)
│   ├── routes/           # API routes (productRoutes.js, authRoutes.js)
│   ├── utils/            # Helper functions (generateToken.js)
│   ├── .env              # Environment variables
│   └── server.js         # Main Express server file
│
└── ecommerce-admin-frontend/
    ├── src/
    │   ├── components/       # Reusable components (Layout, Modal, ProtectedRoute)
    │   ├── pages/            # App pages (Login, Dashboard, Products)
    │   ├── App.jsx           # Main router setup
    │   ├── main.jsx          # Main React entry point (axios config)
    │   └── index.css         # Tailwind CSS directives
    ├── tailwind.config.js  # Tailwind configuration
    └── vite.config.js      # Vite configuration (proxy setup)

