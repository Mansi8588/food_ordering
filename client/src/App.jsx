import React from 'react'
import Navbar from './components/Navbar'
import { AddAddress } from './pages/AddAddress'
import {Route,Routes, useLocation} from 'react-router-dom'
import Home from './pages/Home'
import {Toaster} from "react-hot-toast";
import Footer from './components/Footer';
import { useAppContext } from './context/AppContext';
import Login from './components/Login';
import AllProducts from './pages/AllProducts';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
const App = () => {

const isSellarPath= useLocation().pathname.includes("seller");
const {showUserLogin} = useAppContext()


  return (
    <div>
     {isSellarPath ? null :  <Navbar/>}
     {showUserLogin ? <Login/> : null}

<Toaster />


      <div className= {`${isSellarPath ? "" :  "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
<Routes>
  <Route path='/' element= {<Home/>} />
  <Route path='/products' element= {<AllProducts/>} />
  <Route path='/products/:category' element= {<ProductCategory/>} />
  <Route path='/products/:category/:id' element= {<ProductDetails/>} />
  <Route path='/cart' element= {<Cart/>} />
  <Route path='/add-address' element= {<AddAddress/>} />
</Routes>

      </div>
      {!isSellarPath && <Footer/>}
    </div>
  )
}

export default App
