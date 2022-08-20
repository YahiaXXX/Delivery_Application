import {getApp,getApps,initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCspIHoWrW_y1N8wfUJqlOmtJPEk6e3Vps",
    authDomain: "restaurant-e3aa9.firebaseapp.com",
    databaseURL: "https://restaurant-e3aa9-default-rtdb.firebaseio.com",
    projectId: "restaurant-e3aa9",
    storageBucket: "restaurant-e3aa9.appspot.com",
    messagingSenderId: "68588857672",
    appId: "1:68588857672:web:66c68ba27e920efe7beb7d"
  };


  const app = getApps.length > 0 ? getApp()    : initializeApp(firebaseConfig) 
  const firestore = getFirestore(app)
  const storage= getStorage(app)

  export {app,firestore,storage}
