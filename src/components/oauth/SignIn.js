import StyledInput from "../ui/StyledInput";
import Button from "../ui/Button";
import HorizontalRule from "../ui/HorizontalRule";
import constants from "../../constants";
import H2 from "../ui/H2";
import {signIn, signUpWithGoogle} from "./firebaseFunctions";
import {auth} from "../../firebase/firebase";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

function SignIn({modeChangeHook}) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({email: "", password: ""});

    const updateField = (field, value) => {
        const newData = {...formData};
        newData[field] = value;
        setFormData(newData);
    }

    return (
        <div className={"py-10"}>
            <H2>Sign In</H2>

            <div className={"mx-auto w-full my-5 px-5 md:px-10"}>
                <StyledInput type={"email"} placeholder={"Email"}
                             value={formData.email}
                             onChange={(evt) => {updateField("email", evt.currentTarget.value)}}/>
                <StyledInput type={"password"} placeholder={"Password"}
                             value={formData.password}
                             onChange={(evt) => {updateField("password", evt.currentTarget.value)}}/>
                <Button label={"Sign in!"} onClick={() => signIn(navigate, auth, formData)}/>
                <HorizontalRule/>
                <Button label={"Continue with Google"} style={constants.buttons.RED}
                onClick={() => signUpWithGoogle(auth, navigate)}
                />
                <HorizontalRule/>
                <Button label={"Register now!"} onClick={() => modeChangeHook(constants.oauth.SIGN_UP)}/>
                <div className={"text-red-500 mt-5"} onClick={() => modeChangeHook(constants.oauth.FORGOT_PASSWORD)}>
                    Forgot your password?
                </div>
            </div>

        </div>
    );
}

export default SignIn;