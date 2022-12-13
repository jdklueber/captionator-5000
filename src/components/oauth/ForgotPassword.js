import StyledInput from "../ui/StyledInput";
import Button from "../ui/Button";
import constants from "../../constants";
import H2 from "../ui/H2";

function ForgotPassword({modeChangeHook}) {
    return (
        <div className={"py-10"}>
            <H2>Forgot Password</H2>

            <div className={"mx-auto w-full my-5 px-5 md:px-10"}>
                <StyledInput type={"text"} placeholder={"Email"}/>
                <Button label={"Send Password Reset Email"} />

                <div className={"mt-5 text-red-500"} onClick={() => modeChangeHook(constants.oauth.SIGN_IN)}>
                    Back to sign in
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;