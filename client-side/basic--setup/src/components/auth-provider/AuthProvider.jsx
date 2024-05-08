import { createContext, useEffect, useState } from "react";
import auth from "../../firebase/firebase.config"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const MainContext = createContext(null)
const AuthProvider = ({children}) => {
  const [user , setUser]= useState(null)

  // show modal 
  const [ modal , setModal] = useState(false)

  // creating user 
  const createUser=(email , password)=>{
    return createUserWithEmailAndPassword( auth ,email,password)
  }

  // login user 
  const loginUser=(email , password)=>{
    return signInWithEmailAndPassword(auth,email,password)
  }

  const logOut =()=>{
    return signOut(auth)
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth , currentUser=>{
      setUser(currentUser)
    })
    return ()=>{
      unsubscribe
    }
  },[])
  
  console.log(user);
  const authInfo = {
    createUser,
    loginUser,
    setModal,
    modal,
    user,
    logOut
  }
  return (
    <div>
      <MainContext.Provider value={authInfo}>
      {children}
      </MainContext.Provider>
    </div>
  );
};

export default AuthProvider;