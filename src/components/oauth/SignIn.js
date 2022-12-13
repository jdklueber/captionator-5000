import StyledInput from "../ui/StyledInput";
import Button from "../ui/Button";
import HorizontalRule from "../ui/HorizontalRule";
import constants from "../../constants";
import H2 from "../ui/H2";

function SignIn({modeChangeHook}) {
    return (
        <div className={"py-10"}>
            <H2>Sign In</H2>

            <div className={"mx-auto w-full my-5 px-5 md:px-10"}>
                <StyledInput type={"text"} placeholder={"Email"}/>
                <StyledInput type={"text"} placeholder={"Password"}/>
                <Button label={"Sign in!"} />
                <HorizontalRule/>
                <Button label={"Continue with Google"} style={constants.buttons.RED}/>
                <Button label={"Continue with Facebook"} style={constants.buttons.BLUE}/>
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