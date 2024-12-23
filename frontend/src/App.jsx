import React, { useEffect } from 'react'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Footer from './components/Footer'
import { Routes, Route} from 'react-router-dom'
import AllBooks from './pages/AllBooks'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import ViewBookDetails from './components/ViewBookDetails'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth'
import Favourites from './components/Favourites'
import UserOrderHistory from './components/UserOrderHistory'
import Settings from './components/Settings'
import AllOrders from './pages/AllOrders'
import AddBook from './pages/AddBook'
import UpdateBook from './pages/UpdateBook'
const App = () => {
  const dispatch = useDispatch()
  const role = useSelector((state)=>state.auth.role)
  useEffect(()=>{
    if(
      localStorage.getItem("id")&&
      localStorage.getItem("token")&&
      localStorage.getItem("role")
    ){
      dispatch(authActions.login())
      dispatch(authActions.changeRole(localStorage.getItem("role")))
    }
  },[])
  return (
    <>
      
          <NavBar/>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/all-books" element={<AllBooks/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/profile" element={<Profile/>}>
              {role === "user" ? (<Route index element={<Favourites/>} />) : (<Route index element={<AllOrders/>} />)}
              {role === "admin" && (<Route path="/profile/add-book" element={<AddBook/>}/>)}
              <Route path="/profile/orderHistory" element={<UserOrderHistory/>}/>
              <Route path="/profile/settings" element={<Settings/>}/>
            </Route>
            <Route path="/SignUp" element={<Signup/>}/>
            <Route path="/LogIn" element={<Login/>}/>
            <Route path="/updateBook-details/:id" element={<UpdateBook/>}/>
            <Route path="view-book-details/:id" element={<ViewBookDetails/>}/>
          </Routes>
          <Footer/>
      
    </>
  )
}

export default App