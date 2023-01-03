import React, {useEffect, useState} from "react";
import {auth} from "../firebase/firebase";
import {onAuthStateChanged} from "firebase/auth";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebase/firebase"
import {collections} from "../constants";

const AuthContext = React.createContext()

function AuthProvider({children}) {
    const [user, setUser] = useState();
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
        const getAdminStatus = async () => {
            if (user) {
                const docsnap = await getDoc(doc(db, collections.admins, user.uid));
                if (docsnap.exists()) {
                    setIsAdmin(docsnap.data().admin);
                } else if (user.uid === "N6Xll0QwzeUa20JLFB9Q9eVBJ7d2") {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            }

        }
        getAdminStatus();
    }, [user])

    const authObj = {
        user,
        isAdmin
    }

    return (
        <AuthContext.Provider value={authObj}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
export {AuthContext}