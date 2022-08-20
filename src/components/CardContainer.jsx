import React,{useState,useEffect} from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { motion } from "framer-motion";
import { RiRefreshFill } from "react-icons/ri";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import EmptyCart from "../assets/emptyCart.svg"
import CartItem from "./CartItem";

function CardContainer() {
  const [flag,setFlag]= useState(0)
  const [tot,setTot]=useState(0)
  const [{cartShow,cartItems,user }, dispatch] = useStateValue();
  const showCart = ()=>{
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
   

  }
  useEffect(() => {
    let totalPrice = cartItems.reduce(function(accum,item){
       return accum + item.qty*item.price
 

    },0)
    setTot(totalPrice)
    
    
  }, [tot,flag]);
  return (
    <motion.div initial={{opacity:0,x:200}} animate={{opacity:1,x:0}} exit={{opacity:0,x:200}} className=" z-[101] fixed top-0 right-0 w-full md:w-[375px] h-screen bg-white drop-shadow-md flex flex-col">
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart} >
          <MdOutlineKeyboardBackspace className="text-slate-700 text-3xl" />
        </motion.div>
        <p className="text-slate-700 font-semibold text-lg">Cart</p>
        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md
            hover:shadow-md cursor-pointer text-slate-700 "
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>
      {cartItems && cartItems.length > 0 ? 
      <div className="w-full h-full bg-slate-900 rounded-t-[2rem] flex flex-col">
      <div className=" w-full h-[340px] md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
        {cartItems && cartItems.map(item=>(
          <CartItem key={item.id} item={item} flag={flag} setFlag={setFlag} />
        ))}
      </div>

      <div className=" w-full flex-1 bg-gray-700 rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2" >
            <div className=" w-full flex items-center justify-between" >
              <p className=" text-gray-300 text-lg" >Sub total </p>
              <p className=" text-gray-300 text-lg" > ${tot}</p>

            </div>
            <div className=" w-full flex items-center justify-between" >
              <p className=" text-gray-300 text-lg" >Delivery </p>
              <p className=" text-gray-300 text-lg" >$2.5</p>

            </div>
            <div className=" w-full border-b border-gray-600 my-1" ></div>
            <div className=" w-full flex items-center justify-between " >
              <p className=" text-gray-200 text-xl font-semibold" >Total</p>
              <p className=" text-gray-200 text-xl font-semibold" >${tot+2.5}</p>
            </div>
            {user && (<motion.button  whileTap={{scale:0.8}} className="w-full p-2 rounded-full bg-orange-500 text-gray-50 text-lg my-2 hover:shadow-lg" >
                   Checkout
            </motion.button>)}

      </div>
    </div>        
    : <div className=" w-full h-full flex flex-col items-center justify-center gap-6" >
      <img src={EmptyCart} className="w-300" />
      <p className=" text-xl text-slate-700 font-semibold" >Add some items to your cart</p>
    </div>
    }
      
    </motion.div>
  );
}

export default CardContainer;
