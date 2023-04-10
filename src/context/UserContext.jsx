import {  createContext, useMemo, useState } from "react";


export const  UserContext = createContext() ;

export default function UserContextProvider({children}) {
    const [pins ,setPins] = useState('');
    const [user , setUser] = useState('');
    const [saved , setSaved] = useState([]);
    const [createdPins , setCreatedPins] = useState([]);
    const providerValue = useMemo(()=> {
      return {
        pins , user , setPins ,setUser ,saved, setSaved ,createdPins, setCreatedPins
      } 
    },[pins , user , setPins ,setUser , saved ,setSaved , createdPins, setCreatedPins])
  return (

    <UserContext.Provider value={providerValue}>
        {children}
    </UserContext.Provider>

  )
}
