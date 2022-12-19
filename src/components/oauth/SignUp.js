import StyledInput from "../ui/StyledInput";
import Button from "../ui/Button";
import HorizontalRule from "../ui/HorizontalRule";
import constants from "../../constants";
import H2 from "../ui/H2";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {signUp, signUpWithGoogle} from "./firebaseFunctions";
import {getAuth} from "firebase/auth";

function SignUp({modeChangeHook}) {
    const [signupData, setSignupData] = useState(
        {
            email: "", password: "",
            passwordConfirm: "", displayName: ""
        }
    );
    const navigate = useNavigate();

    const updateField = (field, value) => {
        const newData = {...signupData};
        newData[field] = value;
        setSignupData(newData);
    }



    return (
        <div className={"py-10"}>
            <H2>Sign Up</H2>

            <div className={"mx-auto w-full my-5 px-5 md:px-10"}>
                <StyledInput type={"text"} placeholder={"Display Name"}
                             onChange={(evt) => updateField("displayName", evt.currentTarget.value)}
                             value={signupData.displayName}
                />
                <StyledInput type={"text"} placeholder={"Email"}
                             onChange={(evt) => updateField("email", evt.currentTarget.value)}
                             value={signupData.email}
                />
                <StyledInput type={"password"} placeholder={"Password"}
                             onChange={(evt) => updateField("password", evt.currentTarget.value)}
                             value={signupData.password}
                />
                <StyledInput type={"password"} placeholder={"Confirm Password"}
                             onChange={(evt) => updateField("passwordConfirm", evt.currentTarget.value)}
                             value={signupData.passwordConfirm}
                />
                <Button label={"Sign up!"} onClick={() => signUp(getAuth(), navigate, signupData)}/>
                <HorizontalRule/>
                <Button label={"Continue with Google"} style={constants.buttons.RED}
                        onClick={() => signUpWithGoogle(getAuth(), navigate)}/>
                <div className={"mt-5 text-red-500"} onClick={() => modeChangeHook(constants.oauth.SIGN_IN)}>
                    Back to sign in
                </div>
            </div>

        </div>
    );
}

export default SignUp;