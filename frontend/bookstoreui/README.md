# Bookstore Application

This is a full-stack bookstore application built with a React frontend and an Express backend. The application allows users to browse books, add them to a cart, and complete purchases. Admin users can manage books and view sales.

## Features

- **Frontend**: Built with **React**, **Redux**, and **TailwindCSS**.

## Pages

#### Accessable to all
1. `/` - Home Page
2. `/page/:page` - Access to pagination
3. `/login` - Login page
4. `/register` - Register page
5. `/cart` - Cart page

#### Login Required
5. `/orders` - Orders page
6. `/checkout` - Cart checkout page

#### Admin role required
7. `/admin` - Admin page (Shows book you listed)
8. `/admin/sales` - Sales page (Shows orders of your books, Status can be updated from here)
9. `/admin/book/new` - List new book
10. `/admin/book/edit/:slug` - Edit an exiting book based on slug ( if the book with slug does not exist redirects to `/admin/book/new`)


### Dependencies
```yaml
@reduxjs/toolkit
@tailwindcss/vite
react
react-dom
react-redux
react-router-dom
tailwindcss
```

### Setup

1.Make sure you are in the frontend directory:
  ```bash
  backend/frontend/bookstoreui
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

---
Live (Deployed on Vercel): https://bookhivestore.vercel.app 