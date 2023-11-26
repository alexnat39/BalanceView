import {createContext, useContext, useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";


const UserContext = createContext(undefined)

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const auth = getAuth()

    useEffect(() =>
        onAuthStateChanged(auth, (user) => {
            console.log("USER", user)
            setCurrentUser(user)
            setIsLoading(false)
        }), [])

    return (
        <UserContext.Provider value={{currentUser, isLoading}}>
            {!isLoading && children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)