import { Component } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import Home from './components/Home/Home'
import Product from './components/Product/Product'
import Layout from './components/Layout/Layout'
import Account from './components/Account/Account'
import Wishlist from './components/Wishlist/Wishlist';
import About from './components/About/About'
import Cart from './components/Cart/Cart'
import Nursing from './components/Nursing/Nursing';
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import ProductDetails from './components/Product Details/ProductDetails';
import CategoryDetails from './components/CategoryDetails/CategoryDetails'
import Categories from './components/Categories/Categories'
import {  CartContextProvider } from './context/cartContext';
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/authContext'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'
import { Offline } from 'react-detect-offline'
import NurseInfo from './components/NursingInfo/NursingInfo';
import NurseBooking from './components/NusreBooking/NurseBooking';
import ForgetPassword from './components/ForgetPassword/ForgetPass'
import NotFound from './components/notFound/notfound'
import ResetPassword from './components/ForgetPassword/resetPass'
import BookForm from './components/NusreBooking/BookForm';
import AllOrders from './components/AllOrder/AllOrder'
import Payment from './components/Payment/Payment';

const router = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <Login /> },
      { path: 'home', element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'products', element: <Product /> },
      { path: 'productDetails/:id/:category', element: <ProductDetails /> },
      { path: 'categories', element: <Categories /> },
      { path: 'categoryDetails/:id/:category', element: <CategoryDetails /> },
      { path: 'wishlist', element: <Wishlist /> }, 
      { path: 'account', element: <Account /> },
      { path: 'about', element: <About /> },
      { path: 'cart', element: <Cart /> },
      { path: 'nursing', element: <Nursing /> },
      { path: 'nurseInfo', element: <NurseInfo /> },
      { path: 'nurseBooking', element: <NurseBooking /> },
      {path:"forgot-password",element:<ForgetPassword />},
      {path:"resetPassword",element:<ResetPassword />},
      {path:"allOrders",element:<AllOrders/>},
      {path:"payment",element:<Payment/>},
      { path: '*', element:<NotFound /> },
      {path:"bookForm",element:<BookForm />},

    
    ]
  }


])

export default class App extends Component {
  state = {}
  render() {
    let queryClient = new QueryClient();
    return <>
      <QueryClientProvider client={queryClient}>
        <CartContextProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
        </CartContextProvider>
        <Toaster/>
      </QueryClientProvider>
      <Offline>
    <div className="bg-dark position-fixed text-white bottom-0 start-0 p-3 rounded-3">
      Ooops.... You Are Offline
    </div>
  </Offline>
    </>}
  }


