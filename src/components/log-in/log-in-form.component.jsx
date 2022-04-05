import React, { useState, useContext } from "react";

import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

// import { UserContext } from "../../context/user.context"

import "./log-in-form.styles.scss";


const defaultFormFields = {
    mail: "",
    password: ""
};



const LogInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { mail, password } = formFields;  

    // const { setCurrentUser } = useContext(UserContext); // hier wird aus use context die setCurrentUser funktion extrahiert 

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();   // hier die user daten aus der response destructuren
        
    };


    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            const {user} = await signInAuthUserWithEmailAndPassword(mail, password);
            // console.log(response)
            // setCurrentUser(user);           // hier wird das useContext set current user aufgerufen, also der user im context wird hier gesetzt
            resetFormFields()
        } catch(error) {
            switch(error.code) {
                case "auth/wrong-password": alert("incorrect password or email"); break;
                case "auth/user-not-found": alert("no user associated with this email"); break;
                default: console.log(error)
            }}
        };
    

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields,[name]: value})                                  
    }                                       
    
    

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
             <span>Melde dich mit deiner Email und Passwort an</span>
            <form onSubmit={handleSubmit}>
               
                <FormInput label={"E-Mail"} required type="mail" name="mail" onChange={handleChange} value={mail} />
                <FormInput label={"Passwort"} required type="password" name="password" onChange={handleChange} value={password} />
               
                <div className="buttons-container">
                    <Button type="submit" >Anmelden</Button>
                    <Button type="button" buttonType={"google"} onClick={signInWithGoogle} >Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default LogInForm;