import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import { categories } from "../utils/data";
import Loader from "./Loader";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase.config";
import { saveItem } from "../utils/firebaseFunctions";
import { useStateValue } from "../context/StateProvider";
import { getAllFood } from "../utils/firebaseFunctions";
import { actionType } from "../context/reducer";

function CreateContainer() {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imgAsset, setImgAsset] = useState(null);
  const [{foodItems},dispatch] = useStateValue()

  const uploadImage = (e) => {
    setLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
          setFields(true);
          setMsg("Error while uploading : try again");
          setAlertStatus("danger");
          setTimeout(()=>{
            setFields(false);
            setLoading(false)},4000)

      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setImgAsset(downloadURL);
          setLoading(false);
          setFields(true);
          setMsg('image uploaded successfully')
          setAlertStatus("succes")
          setTimeout(()=>{
            setFields(false)
          },2000)
        })
      }
    );
  };
  const deleteImage = () => {
    setLoading(true);
    const deleteRef = ref(storage,imgAsset);
    deleteObject(deleteRef).then(()=>{
      setImgAsset(null);
      setLoading(false);
      setFields(true);
        setMsg("image deleted successfully");
        setAlertStatus("succes");
        setTimeout(()=>{
          setFields(false)
        },4000)
        
    })
  };
  const saveDetails = () => {
    setLoading(true);
    try{
      if(!title || !calories || !imgAsset || !price ){
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(()=>{
          setFields(false);
          setLoading(false)},4000)
      }
      else {
        const data = {
          id : `${Date.now()}`,
          title: title,
          imageURL : imgAsset,
          category : category,
          calories : calories,
          qty : 1 , 
          price : price
        }
        saveItem(data)
        setLoading(false);
        setFields(true);
        setMsg("Data uploaded successfully");
        clearData();
        setAlertStatus("succes");
       
        setTimeout(()=>{
          setFields(false);
          },4000)
      }

    }
    catch(err){
      console.log(err);
      setFields(true);
      setMsg("Error while uploading : try again");
      setAlertStatus("danger");
      setTimeout(()=>{
        setFields(false);
        setLoading(false)},4000)
   
    }
    fetchData();
  };

  const clearData = ()=>{
    setTitle("");
    setPrice("");
    setCalories("");
    setImgAsset(null);
    setCategory("Select category")

  }
  const fetchData = async ()=>{
    await getAllFood().then((data)=>{
      dispatch({
        type:actionType.SET_FOOD_ITEMS,
        foodItems:data,
      })
    })
  }
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-l-lg p-4 flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={` text-lg font-semibold w-full p-2 rounded-lg text-center ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : " bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}
        <div className=" w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className=" text-xl text-gray-700" />
          <input
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400"
            type="text"
            required
            value={title}
            placeholder="Give me a title..."
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full outline-none text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className=" bg-white">
              Select Category
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  value={item.urlParamName}
                  className=" text-base outline-none border-0 bg-white "
                  key={item.id}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div className="group flex items-center justify-center flex-col border-2  border-gray-300 w-full h-[225px] md:h-[420px] cursor-pointer rounded-lg">
          {loading ? (
            <Loader />
          ) : (
            <>
              {!imgAsset ? (
                <>
                  <label className=" w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className=" w-full h-full flex justify-center items-center flex-col gap-4 ">
                      <MdCloudUpload className=" text-gray-500 text-3xl hover:text-gray-700" />
                      <p className=" text-gray-500 hover:text-gray-700">
                        Click Here To Upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className=" relative h-full">
                    <img
                      src={imgAsset}
                      alt="uploaded image"
                      className=" w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className=" absolute bottom-3 right3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none shadow-md duration-100 ease-in-out transition-all"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className=" w-full flex flex-col md:flex-row items-center gap-3">
          <div className=" w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className=" text-gray-700 text-2xl" />
            <input
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              type="text"
              placeholder="Calories"
              className=" w-full h-full text-lg  bg-transparent outline-none border-none placeholder:text-gray-400"
            />
          </div>

          <div className=" w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className=" text-gray-700 text-2xl" />
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              placeholder="Price"
              className=" w-full h-full text-lg  bg-transparent outline-none border-none placeholder:text-gray-400"
            />
          </div>
        </div>
        <div className=" flex items-center w-full">
          <button
            className=" ml-0  md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={saveDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateContainer;
