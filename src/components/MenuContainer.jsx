import React, { useState,useEffect } from "react";
import { IoFastFood } from "react-icons/io5";
import { categories } from "../utils/data";
import {motion} from "framer-motion"
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";

function MenuContainer() {
  const [filter, setFilter] = useState("chicken");
  const [{foodItems},dispatch]= useStateValue()
  

  return (
    <section className=" w-full my-6" id="menu">
      <div className="w-full flex flex-col items-center justify-center">
        <p
          className=" text-2xl font-semibold capitalize relative text-slate-800 before:absolute
         before:rounded-lg before:content before:w-20 before:h-1 before:-bottom-2 before:left-0
         before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out 
         duration-100 mr-auto"
        >
          Our Hot Dishes
        </p>
        <div className="w-full flex justify-center items-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none ">
          {categories &&
            categories.map((item) => (
              <motion.div
              whileTap={{scale:0.75}}
                onClick={()=>setFilter(item.urlParamName)}
                key={item.id}
                className={`group ${filter===item.urlParamName  ? "bg-red-600" :"bg-white"} w-24 hover:bg-red-600 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 justify-center items-center`}
              >
                <div className={`w-10 h-10 rounded-full shadow-lg ${filter===item.urlParamName  ? "bg-white" :"bg-red-600"}  group-hover:bg-slate-50 flex items-center justify-center`}>
                  <IoFastFood className={`  ${filter===item.urlParamName  ? " text-slate-700" :"text-slate-200"} group-hover:text-slate-700 text-lg`} />
                </div>
                <p className={` text-sm ${filter===item.urlParamName  ? "text-white" :"text-slate-700"}   group-hover:text-slate-50`}>
                  {item.name}
                </p>
              </motion.div>
            ))}
        </div>
        <div className="w-full" >
           <RowContainer flag={false} data={foodItems?.filter( n=> n.category === filter)} />
        </div>
      </div>
    </section>
  );
}

export default MenuContainer;
