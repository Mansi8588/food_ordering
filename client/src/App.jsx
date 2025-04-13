import React from 'react'
import Navbar from './components/Navbar'

import {Route,Routes, useLocation} from 'react-router-dom'
import Home from './pages/Home'
import {Toaster} from "react-hot-toast";
import Footer from './components/Footer';
import { useAppContext } from './context/AppContext';
import Login from './components/Login';
import AllProducts from './pages/AllProducts';
import ProductCategory from './pages/ProductCategory';
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
</Routes>

      </div>
      {!isSellarPath && <Footer/>}
    </div>
  )
}

export default App
