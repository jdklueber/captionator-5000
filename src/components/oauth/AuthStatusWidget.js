import {auth} from "../../firebase/firebase";
import {useContext} from "react";
import Button from "../ui/Button";
import {useNavigate} from "react-router-dom";
import constants, {pages} from "../../constants";
import {AuthContext} from "../../context/AuthContext";

function AuthStatusWidget({isMobile}) {
    const authContext = useContext(AuthContext);

    const output = authContext.user ? <SignedIn user={authContext.user}/> : <SignedOut/>

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