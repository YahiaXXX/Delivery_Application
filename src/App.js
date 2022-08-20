import React,{useEffect} from "react";
import { Header } from "./components";
import { Routes, Route } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import CreateContainer from "./components/CreateContainer";
import { AnimatePresence } from "framer-motion";
import { useStateValue } from "./context/StateProvider";
import { getAllFood } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";

function App() {
  const [{foodItems},dispatch] = useStateValue()

  const fetchData = async ()=>{
    await getAllFood().then((data)=>{
      dispatch({
        type:actionType.SET_FOOD_ITEMS,
        foodItems:data,
      })
    })
  }
  
  useEffect(()=>{
     fetchData()
  },[])

  return (
    <AnimatePresence exitBeforeEnter >
      <div className="w-screen h-auto flex flex-col  bg-slate-50">
        <Header />
        <main className="mt-16 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
