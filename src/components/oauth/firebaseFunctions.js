import {
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile, GoogleAuthProvider, signOut, sendPasswordResetEmail
} from "firebase/auth";
import {toast} from "react-toastify";
import {db} from "../../firebase/firebase";
import {pages} from "../../constants";
import {doc, getDoc, serverTimestamp, setDoc} from "firebase/firestore";

const signUp = async (auth, navigate, signupData) => {
    try {
        await createUserWithEmailAndPassword(auth, signupData.email, signupData.password);
        await updateProfile(auth.currentUser, {displayName: signupData.displayName});
        await buildUserProfile(auth, auth.currentUser, signupData.displayName);
        navigate(pages.HOME);
    } catch (error) {
        toast.error(error.message);
    }
}

const buildUserProfile = async (auth, user, displayName) => {
    //Build the user profile record (optional)
    const docRef = doc(db, "users", user.uid)
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) { //We don't have a user profile for this person
        //Build the user profile data
        const dbProfileData = {
            email: user.email,
            displayName: displayName
        };
        dbProfileData.timestamp = serverTimestamp();
        await setDoc(docRef, dbProfileData);
        toast.success("Account created!");
    }
}

const signUpWithGoogle = async (auth, navigate) => {

    try {
        //Set up our firebase interface
        const provider = new GoogleAuthProvider();

        //Perform the sign up/sign in step
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        buildUserProfile(auth, user);

        //Whether or not we created a profile, they're signed in
        //Navigate back to the home page
        navigate(pages.HOME);
    } catch (error) {
        toast.error(error.message);
    }
}

const signIn = async (navigate, auth, formData) => {
    try {
        //Call the signin functionality
        const credentials = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        if (credentials.user) {
            //Signin was successful, do whatever navigation and
            //notification makes sense here
            navigate("/");
            toast.success("User: " + credentials.user.email);
        }
    } catch (error){
        //Signin failed, notify the user
        toast.error(error.message)
    }
}

const signOutHandler = (auth) => {
    signOut(auth)
}

const forgotPasswordHandler = async (auth, navigate, email) => {
    try {
        //email is tracked in state to be passed along here
        await sendPasswordResetEmail(auth, email);

        //react-toastify notifies the user that
        //their request has been processed
        toast.success("Reset email sent");

        //react-router-dom sends them back to the sign in page
        navigate("/sign-in")
    } catch (error) {
        //Generic react-toastify error notification
        toast.error(error.message);
    }
}

export {signIn, signUp, signUpWithGoogle, signOutHandler, forgotPasswordHandler}