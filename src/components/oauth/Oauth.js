import {useEffect, useState} from "react";
import constants from "../../constants";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import Frame from "../ui/Frame";

function Oauth({initial_mode}) {
    const [mode, setMode] = useState(initial_mode);

    useEffect(() => {
        setMode(initial_mode);
    }, [initial_mode]);

    const content = mode === constants.oauth.SIGN_IN ? <SignIn modeChangeHook={setMode}/> :
                    mode === constants.oauth.SIGN_UP ? <SignUp modeChangeHook={setMode}/> :
                        mode === constants.oauth.FORGOT_PASSWORD ? <ForgotPassword modeChangeHook={setMode}/> :
                        "";


    return (
        <Frame>
            {content}
        </Frame>
    );
}

export default Oauth;