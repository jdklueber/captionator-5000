import React, {useEffect, useState} from "react";
import {auth} from "../firebase/firebase";
import {onAuthStateChanged} from "firebase/auth";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../firebase/firebase"
import {collections} from "../constants";

const AuthContext = React.createContext()

function AuthProvider({children}) {
    const [user, setUser] = useState();
    const [permissions, setPermissions] = useState();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
    },[])

    useEffect(() => {
        if (user) {
            return onSnapshot(doc(db, collections.permissions, user.uid), (doc) => {
                if (doc) {
                    const data = doc.data();
                    if (data.isAdmin) {
                        setIsAdmin(data.isAdmin);
                    } else {
                        setIsAdmin(false);
                    }
                    setPermissions(data);
                } else {
                    setIsAdmin(false);
                }
            });
        } else {
            setPermissions(null);
            setIsAdmin(false);
        }
    }, [user])

    const authObj = {
        user,
        isAdmin,
        permissions
    }

    return (
        <AuthContext.Provider value={authObj}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
export {AuthContext}