import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, createContext,useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import Home from "./Home";
import Contact from "../pages/Contact";
import Shop from "../pages/shop/Shop";
import Men from "../pages/shop/men";
import Women from "../pages/shop/women";
import Sport from "../pages/shop/sports";
import Login from "../pages/login/Login";
import CreateAccount from "../pages/login/create";
import ResetPassword from "../pages/login/Reset";
import CartSection from "../pages/Cart/cartSection";
import Checkout from "../pages/Cart/checkout";
import {Account} from "../pages/Profile/Account";
import Settings from "../pages/Profile/Setting";
import NavbarNav from "./nav";
import { PrivateRoutes, LoginRoute } from "./PrivateRoutes";
import DefaultRoutes from "./DefaultRoutes";
import AdminRoute from "./AdminRoute";
import DashBoard from "../pages/Dashboard/Dashboard";
import Error404 from "../err/404";
import {
  collection, 
  getDocs,
  where,
  setDoc,
  doc,
  addDoc,
  updateDoc,
  query,
  orderBy
} from "firebase/firestore";
import { db } from "../config/firebase";
import Invoice from "../pages/Profile/Invoice";
export const FuncContext = createContext();

const Primary = () => {
  const [user] = useAuthState(auth);

  // Value of Cart Outer To Display The CART
  const [value, toggleState] = useState(false);
  // Cart State
  const [StateOfCart, ChangeState] = useState(true);
  // Users Information Array
  const [users, getUsersFromDatabase] = useState([]);
  // State Of Dashboard Toggler Menu
  const [open, setOpen] = useState(false);
  // State Of The Exact Menu Appearance of Dashborad,Profile
  const [ToggleStateOfDash, SetToggle] = useState(false);

  const[collectionState,setCollectionState] = useState(false)

  const AdminUser = "kChXMwZQ8dMYdiFvvCcsSttaq5S2";

  const CheckUser = () => {

    if (AdminUser === user?.uid) {
      return true;
    }
  };
  const roleDetermination = () => {
    if(AdminUser === user?.uid){
      return "Admin"
    }else {
      return "user"
    }
  }

  const [userStates,setUserStates] = useState([])
  
  // Function to get user states from collection
const getUserStatesFromCollection = async () => {
  try {
    const usersCollection = doc(db, "usersCollection", user?.uid);
    const statesReference = collection(usersCollection, "StateReference");

    const statesSnapshot = await getDocs(statesReference);
    if(statesSnapshot){
    setUserStates(statesSnapshot.docs.map((doc) => ({ ...doc.data() })));
    }
  } catch (err) {
    console.log(`Error fetching user states: ${err.code}`);
  }
};



// Function to add user info to collection
const addUsersToCollection = async (users) => {
  if(users){
    const usersCollection = collection(db,"usersCollection")
    const userDocument =  doc(usersCollection,user?.uid)
    
    const statesReference = collection(userDocument, "StateReference");
    const stateReferenceDoc = doc(statesReference, `${user?.uid}States`);

  

    
  if(!userDocument){ 
    await setDoc(userDocument, { 
      email: user?.email,
      userId: user?.uid,
      photoURL: user?.photoURL,
      name: user?.displayName,
      role: roleDetermination(),
      phoneNumber: "",
      gender: "",
      address: "",
    })
    
  }
}else{
  console.log("user is already exists")
}
  
};

// Function to get user info from collection
const getUsersFromCollection = async () => {
  try {
    const usersCollection = collection(db, "usersCollection");
    const loggedUserReference = query(usersCollection, where("userId", "==", user?.uid));

    const userData = await getDocs(loggedUserReference);

    if(userData.empty){
      console.log("no users Found")
      return
    }

  const Data = userData.docs.map((doc) => ({ ...doc.data() }));

  getUsersFromDatabase(Data)
  } catch (err) {
    console.log(`Error fetching users: ${err}`);
  }
};

// Function to get notifications from collection
const [notifications, setNotifications] = useState([]);

const getNotificationsFromCollection = async () => {
  try {
    const usersCollection = doc(db, "usersCollection", user?.uid);
    const notificationReference = collection(usersCollection, "Notifications");
    const notificationQuery = query(notificationReference, orderBy("title", "desc"));

    const notificationsSnapshot = await getDocs(notificationQuery);
    setNotifications(
      notificationsSnapshot.docs.map((notification) => ({
        ...notification.data(),
        id: notification.id,
      }))
    );
  } catch (err) {
    console.log(`Error fetching notifications: ${err}`);
  }
};

// User data extraction
const userEmail = users.map((user) => user.email);
const userImage = users.map((user) => user.photoURL);
const userName = users.map((user) => user.name);
const userEmailStates = userStates.map((state) => state.isEmailVerified);
const userImageStates = userStates.map((state) => state.isPhotoExist);
const userNameStates = userStates.map((state) => state.isNameExist);

// Function to send specific user notifications
const sendSpecificUserNotifications = async () => {
  try {
    const rolesReference = doc(db, "RolesReference", user?.uid);
    const notificationReference = collection(rolesReference, "Notifications");

    if (!userImageStates[0]) {
      const specificNotificationReference = doc(notificationReference, `${user?.uid}Photo`);
      await setDoc(specificNotificationReference, {
        completed: false,
        title: "Please Update Your Picture",
      });
    }
    if (!userEmailStates[0]) {
      const specificNotificationReference = doc(notificationReference, `${user?.uid}email`);
      await setDoc(specificNotificationReference, {
        completed: false,
        title: "Please Verify Your Email",
      });
    }
    if (!userNameStates[0]) {
      const specificNotificationReference = doc(notificationReference, `${user?.uid}userName`);
      await setDoc(specificNotificationReference, {
        completed: false,
        title: "Please Define Your Name",
      });
    }
  } catch (err) {
    console.log(`Error sending notifications: ${err}`);
  } finally {
    getUsersFromCollection();
  }
};

  const UpdateNotificationState = async (email,userName,userImage) => {
    try{
      const RolesReference = doc(db, "RolesReference", user?.uid);
    
      const NotificationReference = collection(RolesReference, "Notifications");
      
      if(email || userName || userImage){
        if(email){
          const SpecificNotificationReference = doc(NotificationReference,`${user?.uid}email`)

          await updateDoc(SpecificNotificationReference,{
            "completed":true
          })
        }
        if(userImage){
          const SpecificNotificationReference = doc(NotificationReference,`${user?.uid}UserPhoto`)

          await updateDoc(SpecificNotificationReference,{
            "completed":true
          })
        }
      }

    }
    catch(err){
      console.log(err)
    }
    finally{
      getNotificationsFromCollection()

    }
  }


  useEffect(() => {

    addUsersToCollection(user)



  },[collectionState])

  useEffect(() => {
    getUsersFromCollection()

    getUserStatesFromCollection()

  },[])


  return (
    <FuncContext.Provider
      value={{       
        userEmail,
        userImage,
        notifications,
        getNotificationsFromCollection,
        getUsersFromCollection,
        CheckUser,
        open,
        value,
        StateOfCart,
        users,
        ToggleStateOfDash,
        setOpen,
        toggleState,
        ChangeState,
        getUsersFromDatabase,
        SetToggle,
      }}
    >
      {/* basename="/Dashboard" */}
      <Router basename="/Dashboard">
        <NavbarNav />
        <Routes>
          {/* PrivateRoutes */}
          <Route element={<PrivateRoutes />}>
            <Route path="/CartSection" element={<CartSection />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/Account" element={<Account />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/Invoice" element={<Invoice />} />
            <Route element={<AdminRoute />}>
            <Route path="/Dashboard" element={<DashBoard />} />
            </Route>
          </Route>
          {/* LoginRoute */}
          <Route element={<LoginRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<CreateAccount />} />
            <Route path="/Reset" element={<ResetPassword />} />
          </Route>
          {/* DefaultRoutes */}
          <Route errorElement={<Error404 />}  element={<DefaultRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/Shop" element={<Shop />} />
            <Route path="/women" element={<Women />} />
            <Route path="/men" element={<Men />} />
            <Route path="/sports" element={<Sport />} />
            <Route path="/*" element={<Error404 />} />
          </Route>
        </Routes>
      </Router>
    </FuncContext.Provider>
  );
};

export default Primary;
