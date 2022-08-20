import React,{useEffect, useRef,useState} from 'react'
import {MdShoppingBasket} from "react-icons/md"
import {motion} from "framer-motion"
import NotFound from "../assets/NotFound.svg"
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'

function RowContainer({flag,data,scrollValue}) {
    const [{cartItems},dispatch]= useStateValue()
    const [items,setItems]= useState(cartItems)
    
    const rowContainer=useRef()
    useEffect(() => {
        rowContainer.current.scrollLeft += scrollValue
   
    }, [scrollValue]);
    useEffect(() => {
       addtocart()
   
    }, [items]);

    const addtocart = () => {
        dispatch({
            type:actionType.SET_CARTITEMS,
            cartItems : items
        })
        localStorage.setItem("cartItems",JSON.stringify(items))
    }
  return (
    <div ref={rowContainer} className={`w-full my-12 flex gap-3 items-center scroll-smooth ${flag ? "overflow-x-scroll scrollbar-none"  : "overflow-x-hidden flex-wrap justify-center" }`} >
        {data && data.length > 0 ? data.map((item)=>(
            <div key={item?.id} className=" flex flex-col items-center justify-end w-full min-w-[300px] my-12 md:w-[320px] md:min-w-[340px] bg-slate-50 rounded-lg h-[175px] p-2 backdrop-blur-lg hover:drop-shadow-lg " >
            <div className="flex w-full justify-between items-center" >
                <motion.div whileHover={{scale:1.2}} className="w-40 h-40 -mt-8 drop-shadow-2xl" >
                <img   src={item?.imageURL} className="w-full h-full object-contain"
                 referrerPolicy='no-referrer' />
                </motion.div>
                 <motion.div onClick={()=>setItems([...cartItems,item])} whileTap={{scale : 0.75}} className="w-8 h-8 rounded-full bg-red-600 flex justify-center items-center cursor-pointer hover:shadow-md" >
                    <MdShoppingBasket className=" text-white" />
                 </motion.div>
            </div>
            <div className="w-full flex items-end justify-end flex-col" >
                <p className="text-slate-700 font-semibold text-base md:text-lg" >
                    {item?.title}
                </p>
                <p className="mt-1 text-sm text-gray-500" >
                    {item?.calories} calories
                </p>
                <div className=" flex items-center gap-8" >
                    <p className="text-lg text-slate-900 font-semibold" > <span className="text-sm text-red-600" >$</span>{item.price} </p>

                </div>
            </div>

        </div>

        )) : <div className="w-full flex items-center justify-center flex-col" >
            <img src={NotFound} className="h-[340px]" /> 
            <p className="text-xl font-semibold text-slate-700 my-2" >items are not available</p>
        </div> }
    </div>
  )
}

export default RowContainer