import StyledInput from "../ui/StyledInput";
import Button from "../ui/Button";
import HorizontalRule from "../ui/HorizontalRule";
import constants from "../../constants";
import H2 from "../ui/H2";

function SignUp({modeChangeHook}) {
    return (
        <div className={"py-10"}>
            <H2>Sign Up</H2>

            <div className={"mx-auto w-full my-5 px-5 md:px-10"}>
                <StyledInput type={"text"} placeholder={"Display Name"}/>
                <StyledInput type={"text"} placeholder={"Email"}/>
                <StyledInput type={"text"} placeholder={"Password"}/>
                <StyledInput type={"text"} placeholder={"Confirm Password"}/>
                <Button label={"Sign up!"} />
                <HorizontalRule/>
                <Button label={"Continue with Google"} style={constants.buttons.RED}/>
                <Button label={"Continue with Facebook"} style={constants.buttons.BLUE}/>
                <div className={"mt-5 text-red-500"} onClick={() => modeChangeHook(constants.oauth.SIGN_IN)}>
                    Back to sign in
                </div>
            </div>

        </div>
    );
}

export default SignUp;