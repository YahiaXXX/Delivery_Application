import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import Avatar from "../assets/avatar.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

function Header() {
  const [isMenu, setIsMenu] = useState(false);
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user,cartShow,cartItems }, dispatch] = useStateValue();

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    }
    if (user) setIsMenu(!isMenu);
  };
  const showCart = ()=>{
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });

  }
  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16  bg-slate-50">
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" />
          <p className=" text-slate-500  text-xl font-bold">City</p>
        </Link>
        <div className="flex justify-center items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8 ml-auto"
          >
            <li
              className=" text-base text-slate-500 hover:text-slate-800 duration-100
             cursor-pointer transition-all ease-in-out"
             
            >
              Home
            </li>
            <li
              className=" text-base text-slate-500 hover:text-slate-800 duration-100
             cursor-pointer transition-all ease-in-out"
            >
              Menu
            </li>
            <li
              className=" text-base text-slate-500 hover:text-slate-800 duration-100
             cursor-pointer transition-all ease-in-out"
            >
              About Us
            </li>
            <li
              className=" text-base text-slate-500 hover:text-slate-800 duration-100
             cursor-pointer transition-all ease-in-out"
            >
              Services
            </li>
          </motion.ul>
          <div className="relative flex justify-center items-center" onClick={showCart} >
            <MdShoppingBasket className="text-slate-500 text-2xl ml-8 cursor-pointer" />
            {cartItems && cartItems.length > 0 && <div className=" absolute -top-2 -right-2 w-5 rounded-full h-5 bg-red-600 flex items-center justify-center">
              <p className=" text-xs text-white font-semibold">{cartItems.length}</p>
            </div>}
          </div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              alt="userProfil"
              onClick={login}
              referrerPolicy="no-referrer"
              className=" rounded-full cursor-pointer w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl"
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className=" absolute bg-gray-50 w-40 shadow-xl rounded-lg flex flex-col top-11 right-0"
              >
                {user && user.email === "y.boukharouba@esi-sba.dz" && (
                  <Link to={"/createItem"}>
                    <p
                      className=" px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100
            transition-all duration-100 ease-in-out text-slate-500 text-base"
            onClick={()=>setIsMenu(false)}
                    >
                      New Item <MdAdd />
                    </p>
                    
                  </Link>
                )}
                <p
                  className=" px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100
            transition-all duration-100 ease-in-out text-slate-500 text-base"
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex md:hidden items-center justify-between w-full h-full">
        <div className="relative flex justify-center items-center" onClick={showCart} >
          <MdShoppingBasket className="text-slate-500 text-2xl ml-8 cursor-pointer" />
          {cartItems && cartItems.length >0 && <div className=" absolute -top-2 -right-2 w-5 rounded-full h-5 bg-red-600 flex items-center justify-center">
            <p className=" text-xs text-white font-semibold">{cartItems.length}</p>
          </div>}
        </div>
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" />
          <p className=" text-slate-500  text-xl font-bold">City</p>
        </Link>
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            alt="userProfil"
            onClick={login}
            className=" rounded-full cursor-pointer w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl"
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className=" absolute bg-gray-50 w-40 shadow-xl rounded-lg flex flex-col top-11 right-0"
            >
              {user && user.email === "y.boukharouba@esi-sba.dz" && (
                <p
                  className=" px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100
            transition-all duration-100 ease-in-out text-slate-500 text-base"
            onClick={()=>setIsMenu(false)}
                >
                  New Item <MdAdd />
                </p>
              )}
              <ul className="flex flex-col gap-2">
                <li
                  className=" text-base text-slate-500 hover:text-slate-800 duration-100
             cursor-pointer transition-all ease-in-out hover:bg-slate-100 px-4 py-2"
             onClick={()=>setIsMenu(false)}
                >
                  Home
                </li>
                <li
                  className=" text-base text-slate-500 hover:text-slate-800 duration-100
             cursor-pointer transition-all ease-in-out hover:bg-slate-100 px-4 py-2"
             onClick={()=>setIsMenu(false)}
                >
                  Menu
                </li>
                <li
                  className=" text-base text-slate-500 hover:text-slate-800 duration-100
             cursor-pointer transition-all ease-in-out hover:bg-slate-100 px-4 py-2"
             onClick={()=>setIsMenu(false)}
                >
                  About Us
                </li>
                <li
                  className=" text-base text-slate-500 hover:text-slate-800 duration-100
             cursor-pointer transition-all ease-in-out hover:bg-slate-100 px-4 py-2"
             onClick={()=>setIsMenu(false)}
                >
                  Services
                </li>
              </ul>
              <p
                className=" m-2 p-2 rounded-md shadow-md flex items-center gap-3 cursor-pointer hover:bg-slate-300
            transition-all duration-100 ease-in-out text-slate-500 text-base justify-center bg-gray-200"
                onClick={logout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
