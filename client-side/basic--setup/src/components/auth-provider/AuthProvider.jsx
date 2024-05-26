import { createContext, useEffect, useState } from "react";
import auth from "../../firebase/firebase.config"
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import axios from "axios";

export const MainContext = createContext(null)

const googleProvider = new GoogleAuthProvider()

// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {
  const [user , setUser]= useState(null)
  const [theme , setTheme]= useState()
  // const axiosHook = useFetch()
  const [loading , setLoading] = useState(true)
  // show modal 
  const [ modal , setModal] = useState(false)




  // creating user 
  const createUser=(email , password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword( auth ,email,password)
  }

  // login user 
  const loginUser=(email , password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)
  }

  // login with google 
  const googleLogin=()=>{
    setLoading(true)
    return signInWithPopup(auth,googleProvider)
  }
  
const resetPass = (email)=>{
  // console.log(email);
  return sendPasswordResetEmail(auth ,email)
}

  const logOut =()=>{
    setLoading(true)
    return signOut(auth)
  }
  // console.log( 'user email =',userEmail);
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth , currentUser=>{
      const userEmail= currentUser?.email || user?.email
  
      const loggedUser = {email: userEmail} 
      setUser(currentUser)
      setLoading(false)
      if(currentUser){
          axios.post('http://localhost:5000/jwt',loggedUser,{withCredentials:true})
          .then(()=> {
            // console.log(res.data);
          })
      }else{
        axios.post('http://localhost:5000/logout', loggedUser ,{withCredentials:true})
        .then(()=>{

        })
      }
    })
    return ()=>{
      unsubscribe
    }
  },[user])
  
  // console.log(user);
  const authInfo = {
    createUser,
    loginUser,
    setModal,
    modal,
    user,
    logOut,
    resetPass,
    theme,
    googleLogin,
    setTheme,
    loading
  }
  // console.log(theme);
  return (
    <div>
      <MainContext.Provider value={authInfo}>
      {children}
      </MainContext.Provider>
    </div>
  );
};

export default AuthProvider;