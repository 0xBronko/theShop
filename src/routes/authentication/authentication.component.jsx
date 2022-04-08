import React from "react";
import LogInForm from "../../components/log-in/log-in-form.component";
import SignInForm from "../../components/sign-up/sign-up.component";
// import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import "./authentication.styles.scss"

const Authentication = () => {

    // async function, da Datenbankabruf
    // const logGoogleUser = async () => {
    //     const { user } = await signInWithGooglePopup();   // hier die user daten aus der response destructuren
    //     await createUserDocumentFromAuth(user);
    // };

    return(
        <div className="authentication-container">
            <LogInForm />
            <SignInForm />
        </div>
    )
}

export default Authentication;