import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;


export const AppContext=createContext();




export const AppContextProvider=({children})=>{


    const currency= import.meta.env.VITE_CURRENCY;


    const navigate=useNavigate();
    const [user,setUser]=useState(null); 
    const [isSeller,setIsSeller]=useState(false);
    const [showUserLogin,setShowUserLogin]=useState(false);
const [products, setProducts]= useState([])

const [cartItems, setcartItems]= useState({})
const [searchQuery, setSearchQuery]= useState({})

//Fetch Seller Status
const fetchSeller = async ()=>{
    try {
        const {data} = await axios.get('/api/seller/is-auth');
        if(data.success){
            setIsSeller(true)
        }else{
            setIsSeller(false)
        }
    } catch (error) {
        setIsSeller(false)
    }
}

//Fetch User Auth Status , User Data and Cart Items
const fetchUser = async ()=>{
    try {
        const {data} = await axios.get('api/user/is-auth');
        if(data.success){
            setUser(data.user)
            setcartItems(data.user.cartItems)
        }
    } catch (error) {
        setUser(null)
    }
}

const fetchProducts= async () =>{
   try {
        const { data } = await axios.get('/api/product/list')
        if(data.success){
            setProducts(data.products)
        }else{
            toast.error(data.message)
        }
   } catch (error) {
        toast.error(error.message)
   }
}


const addToCart=(itemId)=>{
    let cartData= structuredClone(cartItems);

    if(cartData[itemId]){
        cartData[itemId]+=1;
    }
    else{
        cartData[itemId]=1;
    }
    setcartItems(cartData);
    toast.success("Added to Cart")
}



const updateCartItem= (itemId,quantity)=>{
    let cartData= structuredClone(cartItems);
    cartData[itemId]=quantity;
    setcartItems(cartData)
    toast.success("Cart updated")
}

const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
        cartData[itemId] -= 1;
        if (cartData[itemId] <= 0) {
            delete cartData[itemId];
        }
    }
    toast.success("Removed from cart");
    setcartItems(cartData); // <== This is essential!
}

    // Get Cart Item Count
    const getCartCount = ()=>{
        let totalCount = 0;
        for(const item in cartItems){
            totalCount += cartItems[item];
        }
        return totalCount;
    }

    //Get cart Total amount
    const getCartAmount = ()=>{
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=> product._id === items);
            if(cartItems[items]>0){
                totalAmount += itemInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

useEffect(()=>{
    fetchUser()
    fetchSeller()
 fetchProducts()
},[])

    //Update Database Cart Items
    useEffect(()=>{
        const updateCart = async () =>{
            try {
                const { data } = await axios.post('/api/cart/update',{cartItems})
                if(!data.success){
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
        if(user){
            updateCart()
        }
    },[cartItems])

    const value={navigate,user,setUser,setIsSeller,isSeller,showUserLogin,
        setShowUserLogin,products,currency,addToCart,updateCartItem,
        removeFromCart,cartItems,searchQuery, setSearchQuery,
        getCartCount, getCartAmount, axios, fetchProducts
    }

    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext=()=>{
    return useContext(AppContext)
}