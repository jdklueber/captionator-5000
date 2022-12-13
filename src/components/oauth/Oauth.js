import {useState} from "react";
import constants from "../../constants";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import Frame from "../ui/Frame";

function Oauth() {
    const [mode, setMode] = useState(constants.oauth.SIGN_IN);

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