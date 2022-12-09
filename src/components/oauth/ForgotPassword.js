import StyledInput from "../ui/StyledInput";
import Button from "../ui/Button";
import constants from "../../constants";

function ForgotPassword({modeChangeHook}) {
    return (
        <div className={"py-10"}>
            <h2 className={"font-bold text-3xl max-w-fit mx-auto"}>Forgot Password</h2>

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