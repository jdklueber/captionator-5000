import StyledInput from "../ui/StyledInput";
import Button from "../ui/Button";
import HorizontalRule from "../ui/HorizontalRule";
import constants, {pages} from "../../constants";
import H2 from "../ui/H2";
import {createUserWithEmailAndPassword, updateProfile,
    GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {doc, setDoc, serverTimestamp, getDoc} from "firebase/firestore";
import {db, auth} from "../../firebase/firebase";
import {useState} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

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

    const signUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, signupData.email, signupData.password);
            updateProfile(auth.currentUser, {displayName: signupData.displayName});
            toast.success("Account created!");
            navigate(pages.HOME);
        } catch (error) {
            toast.error(error.message);
        }
    }

    const signUpWithGoogle = async () => {

        try {
            //Set up our firebase interface
            const provider = new GoogleAuthProvider();

            //Perform the sign up/sign in step
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            //Build the user profile record (optional)
            const docRef = doc(db, "users", user.uid)
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) { //We don't have a user profile for this person
                //Build the user profile data
                const dbProfileData = {
                    email: user.email,
                    displayName: auth.currentUser.displayName
                };
                dbProfileData.timestamp = serverTimestamp();
                await setDoc(docRef, dbProfileData);

                //Let them know the account was created successfully
                toast.success("Account created!");
            }
            //Whether or not we created a profile, they're signed in
            //Navigate back to the home page
            navigate(pages.HOME);
        } catch (error) {
            toast.error(error.message);
        }
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
                <Button label={"Sign up!"} onClick={signUp}/>
                <HorizontalRule/>
                <Button label={"Continue with Google"} style={constants.buttons.RED} onClick={signUpWithGoogle}/>
                <div className={"mt-5 text-red-500"} onClick={() => modeChangeHook(constants.oauth.SIGN_IN)}>
                    Back to sign in
                </div>
            </div>

        </div>
    );
}

export default SignUp;