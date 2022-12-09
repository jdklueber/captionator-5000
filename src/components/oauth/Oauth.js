import {useState} from "react";
import constants from "../../constants";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";

function Oauth() {
    const [mode, setMode] = useState(constants.oauth.SIGN_IN);

    const content = mode === constants.oauth.SIGN_IN ? <SignIn modeChangeHook={setMode}/> :
                    mode === constants.oauth.SIGN_UP ? <SignUp modeChangeHook={setMode}/> :
                        mode === constants.oauth.FORGOT_PASSWORD ? <ForgotPassword modeChangeHook={setMode}/> :
                        "";


    return (
        <div className={"w-full border-2 rounded-lg border-gray-300 mx-auto my-5 md:m-10"}>
            {content}
        </div>
    );
}

export default Oauth;