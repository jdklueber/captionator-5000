import StyledInput from "../ui/StyledInput";
import Button from "../ui/Button";
import constants from "../../constants";
import H2 from "../ui/H2";
import {useState} from "react";
import {forgotPasswordHandler} from "./firebaseFunctions";
import {auth} from "../../firebase/firebase";
import {useNavigate} from "react-router-dom";

function ForgotPassword({modeChangeHook}) {
    const [formData, setFormData] = useState({email: ""});
    const navigate = useNavigate();

    const updateField = (field, value) => {
        const newData = {...formData};
        newData[field] = value;
        setFormData(newData);
    }

    return (
        <div className={"py-10"}>
            <H2>Forgot Password</H2>

            <div className={"mx-auto w-full my-5 px-5 md:px-10"}>
                <StyledInput type={"email"} placeholder={"Email"}
                             value={formData.email}
                             onChange={(evt) => {updateField("email", evt.currentTarget.value)}}/>
                <Button label={"Send Password Reset Email"}
                        onClick={() => {forgotPasswordHandler(auth, navigate, formData.email)}}
                />

                <div className={"mt-5 text-red-500"} onClick={() => modeChangeHook(constants.oauth.SIGN_IN)}>
                    Back to sign in
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;