import {auth} from "../../firebase/firebase";
import {useEffect, useState} from "react";
import {onAuthStateChanged} from 'firebase/auth'
import Button from "../ui/Button";
import {useNavigate} from "react-router-dom";
import constants, {pages} from "../../constants";

function AuthStatusWidget({isMobile}) {
    const [user, setUser] = useState(null);

    useEffect(()=> {
        onAuthStateChanged(auth, (userObj) => {
            if (userObj) {
                setUser(userObj);
            } else {
                setUser(null);
            }
        });
    }, [])

    const output = user ? <SignedIn user={user}/> : <SignedOut/>

    let displayClasses = "hidden md:block"
    if (isMobile) {
        displayClasses = "block md:hidden"
    }

    return (
        <div className={`my-auto ${displayClasses}`}>
            {output}
        </div>
    );
}

function SignedIn({user}) {
    const signOut = () => {
        auth.signOut();
    }

    return (
        <div className={"flex flex-row w-fit"}>
            <div className={"min-w-fit mr-6 my-auto"}>{user.displayName}</div>
            <Button onClick={() => signOut()} label={"Sign Out"} style={constants.buttons.PLAIN}/>
        </div>
    )
}

function SignedOut() {
    const navigate = useNavigate();

    return (
        <div className={"flex flex-row w-fit gap-4"}>
            <Button onClick={() => navigate(pages.SIGN_UP)} label={"Register"}/>
            <Button onClick={() => navigate(pages.SIGN_IN)} label={"Sign In"}/>

        </div>
    )
}

export default AuthStatusWidget;