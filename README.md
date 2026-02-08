# 🛒 Shopping Cart Application

A full-stack shopping cart application built using **React**, **Node.js**, **Express**, and **MongoDB**, implementing a complete e-commerce flow with secure authentication, cart management, and order processing.



## 🚀 Features

### 🔐 Authentication
- User registration and login
- JWT-based authentication stored in **HTTP-only cookies**
- Single active session per user
- Protected routes on both frontend and backend

### 🛍️ Products
- View list of available products
- Product data structured for easy backend seeding

### 🛒 Cart
- Each user has **one cart**
- Add items to cart (no duplicates)
- Remove single items or clear entire cart
- Cart is user-specific and protected

### 📦 Orders
- Convert cart into an order at checkout
- Cart is cleared after successful order placement
- View order history
- Support for multiple orders per user
- Admin endpoint to view all orders



## 🧱 Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios
- React Toastify
- React Icons

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- Cookie Parser
- CORS


## 🗂️ Project Structure
```
shopping-cart-app/
├── backend/
│ ├── src/
│ │ ├── models/
│ │ │ ├── User.js
│ │ │ ├── Item.js
│ │ │ ├── Cart.js
│ │ │ └── Orders.js
│ │ ├── routes/
│ │ │ ├── userRoutes.js
│ │ │ ├── itemRoutes.js
│ │ │ ├── cartRoutes.js
│ │ │ └── orderRoutes.js
│ │ ├── middleware/
│ │ │ └── auth.js
│ ├── server.js
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── data/
│ │ │ └── items.js
│ │ ├── api/
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── package.json
│
└── README.md
```



## 🔑 Environment Variables

### Backend (`.env`)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/shopping_cart
JWT_SECRET=supersecretkey
ACCESS_TOKEN_EXP=7d
CLIENT_URL=http://localhost:5173
```




## 🔌 API Endpoints

### Users
| Method | Endpoint | Description |
|------|---------------------|-------------|
POST | `/api/users/register` | Register user |
GET | `/api/users` | List user |
GET | `/api/users/all` | List all users (admin)|
POST | `/api/users/login` | Login user |

### Items
| Method | Endpoint | Description |
|------|---------|-------------|
POST | `/api/items` | Create item (admin)|
GET | `/api/items` | List all items |

### Cart
| Method | Endpoint | Description |
|------|---------|-------------|
GET | `/api/cart` | Get user cart |
POST | `/api/cart` | Add item to cart |
DELETE | `/api/cart/item/:itemId` | Remove item |
DELETE | `/api/cart` | Clear cart |

### Orders
| Method | Endpoint | Description |
|------|---------|-------------|
POST | `/api/orders` | Place order |
GET | `/api/orders` | User order history |
GET | `/api/orders/all` | All orders (admin) |


## 🔐 Authentication Flow

- Login sets JWT in an HTTP-only cookie

- Cookie is sent automatically on every request

- Backend middleware validates token and user session

- Protected routes are guarded using a custom ProtectedRoute component

## 📈 Future Enhancements

- Role-based access control (Admin/User)

- Inventory management

- Pagination and filtering

- Payment gateway integration

- Backend item management UI

## 🛠️ Running the Project
### Backend
``` 
cd backend
npm install
npm run dev
```
### Frontend
```
cd frontend
npm install
npm run dev
```

## 🎯 Summary

This project demonstrates:

- Secure authentication

- Clean REST API design

- Real-world data modeling

- Protected routes

- Scalable backend architecture

- Built as a portfolio-ready full-stack application showcasing real-world engineering practices.


## 📄 License

### MIT