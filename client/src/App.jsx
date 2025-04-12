import React from 'react'
import Navbar from './components/Navbar'

import {Route,Routes, useLocation} from 'react-router-dom'
import Home from './pages/Home'
import {Toaster} from "react-hot-toast";
import Footer from './components/Footer';
const App = () => {

const isSellarPath= useLocation().pathname.includes("seller");



  return (
    <div>
     {isSellarPath ? null :  <Navbar/>}

<Toaster />


      <div className= {`${isSellarPath ? "" :  "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
<Routes>
  <Route path='/' element= {<Home/>} />
</Routes>

      </div>
      {!isSellarPath && <Footer/>}
    </div>
  )
}

export default App
