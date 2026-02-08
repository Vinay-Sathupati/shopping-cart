import {Routes, Route, Navigate} from 'react-router-dom'

import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import ItemsList from './components/ItemsList'
import Cart from './components/Cart/Cart'
import Orders from './components/Orders/Orders'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute';



const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route 
          path='/' 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/products" 
          element={
            <ProtectedRoute>
              <ItemsList />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/cart' 
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/orders" 
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>

      <ToastContainer position="top-center" autoClose={3000} />
    </>
  )
}

export default App
