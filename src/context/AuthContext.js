import React, {useEffect, useState} from "react";
import {auth} from "../firebase/firebase";
import {onAuthStateChanged} from "firebase/auth";


const AuthContext = React.createContext()

function AuthProvider({children}) {
    const [user, setUser] = useState()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        });
    },[])


    const authObj = {
        user,
    }

    return (
        <AuthContext.Provider value={authObj}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
export {AuthContext}