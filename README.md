# Bookstore Application

This is a full-stack bookstore application built with a React frontend and an Express backend. The application allows users to browse books, add them to a cart, and complete purchases. Admin users can manage books and view sales.

## Features

- **Frontend**: Built with **React**, **Redux**, and **TailwindCSS**.
- **Backend**: Built with **Express**, **MongoDB**, and **Cloudinary** for image storage.
- **Authentication**: JWT-based authentication with role-based access control.
- **Cart Management**: Persistent cart storage using localStorage.
- **Admin Dashboard**: Manage books and view sales.

---

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or later)
- npm or yarn
- MongoDB (local or cloud instance)
- Cloudinary account (for image uploads)

---

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
  ```bash
  npm install
  ```

3. Create a .env file in the backend directory with the following variables:
  ```env
  PORT=5000
  MONGO_URL=<your-mongodb-connection-string>
  JWT_SECRET=<your-jwt-secret>
  JWT_EXPIRATION=1d
  CLOUDINARY_NAME=<your-cloudinary-name>
  CLOUDINARY_KEY=<your-cloudinary-api-key>
  CLOUDINARY_SECRET=<your-cloudinary-api-secret>
  LIVE_URL=<frontend-url>
  ```

4. Start the backend server:
  ```bash
  npm run dev
  ```
5. Access the backend at: http://localhost:5000

### Frontend Setup
1.Navigate to the frontend directory:
  ```bash
  cd frontend/bookstoreui
  ```

2. Install dependencies:
  ```bash
  npm install
  ```
3. Create a .env file in the frontend/bookstoreui directory with the following variable:
  ```env
  VITE_BACKEND_URL=http://localhost:5000
  ```

4. Start the development server:
  ```bash
  npm run dev
  ```
5. Open the application in your browser at:
http://localhost:5173