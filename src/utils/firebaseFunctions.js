//saving new item

import { collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore"
import { firestore } from "../firebase.config"

export const saveItem = async (data)=>{
   await setDoc(doc(firestore,'FoodItems',`^${Date.now()}`),data,{merge: true})
  
}

export const getAllFood = async ()=>{
    const items = await getDocs(query(collection(firestore,"FoodItems"),orderBy("id","desc")));
    return items.docs.map(doc=>doc.data())
}