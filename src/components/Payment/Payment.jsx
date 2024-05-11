import React, { useContext } from 'react'
import  axios  from 'axios';
import { CartContext } from '../../context/cartContext';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function Payment() {
  const{cartId,setCartProduct,setTotalCartProduct,setNumOfCartItem}=  useContext(CartContext)
   async function confirmPayment() {
     const phoneValue=   document.querySelector("#phone").value;
        const cityValue=document.querySelector("#city").value;
       const detailsValue= document.querySelector("#details").value;
       const shippingAddress={
        "shippingAddress":{
            "details":detailsValue,
            "phone":phoneValue, 
            "city":cityValue
        }
       }
       try{
        const{data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,shippingAddress,
        {
            headers:{token:localStorage.getItem("tkn")}
        })
        if (data.status ==="success") {
            toast.success("Order is Successfully")
            setCartProduct([])
            setNumOfCartItem(0)
            setTotalCartProduct(0)
        }else{
            toast.error("Error acured")
        }
        console.log(data)
        return data;
       } 
       catch(e){
        console.log("error",e)
       }
    }
    async function confirmOnlinePayment() {
        const phoneValue=   document.querySelector("#phone").value;
           const cityValue=document.querySelector("#city").value;
          const detailsValue= document.querySelector("#details").value;
          const shippingAddress={
           "shippingAddress":{
               "details":detailsValue,
               "phone":phoneValue,
               "city":cityValue
           }
          }
          try{
           const{data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,shippingAddress,
           {
               headers:{token:localStorage.getItem("tkn")},
               params:{url:"http://localhost:3000"}
           })
            window.open(data.session.url,"_blank");
          } 
          catch(e){
           console.log("error",e)
          }
       }
  return <>
  <Helmet>
    <title>Payment</title>
  </Helmet>
  <style>{`
        body {
          background: linear-gradient(to top, #072E33, #009578); 
          margin: 0;
          padding: 0; 
          color:#77fce1
        }
      `}</style>
  <div className="container pt-5 mt-5">
    <form>
        <label htmlFor=''>
            Phone :
        </label>
        <input type='tel' id='phone' placeholder='Phone Number' className='mb-3 form-control login-inputt'>
        </input>
        <label htmlFor=''>
            City :
        </label>
        <input type='text' id='city' placeholder='City' className='mb-3 form-control login-inputt'>
        </input>
        <label htmlFor=''>
           Details :
        </label>
        <textarea type='text' id='details' placeholder='Details' className='mb-3 form-control login-inputt'>
        </textarea>
        <button type='button' onClick={confirmPayment} className='btn btn-dark '>Confirm Cash Payment</button>
        <button type='button' onClick={confirmOnlinePayment} className='mx-4 btn btn-dark '>Confirm Online Payment</button>
    </form>
    </div></>
}
