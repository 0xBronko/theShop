import React from "react";
import SignInForm from "../../components/sign-in/sign-in.component";
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";


const SignIn = () => {

    // async function, da Datenbankabruf
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();   // hier die user daten aus der response destructuren
        createUserDocumentFromAuth(user);
    };

    return(
        <>
            <h1>Sign in Area</h1>
            <button onClick={logGoogleUser}>Sign In With Google</button>
            <SignInForm />
        </>
    )
}

export default SignIn;