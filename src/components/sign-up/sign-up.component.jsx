import React, { useContext, useState } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
// import { UserContext } from "../../context/user.context"

import "./sign-up-form.styles.scss";


const defaultFormFields = {
    displayName: "", 
    mail: "",
    password: "",
    confirmPassword: ""
};


const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, mail, password, confirmPassword} = formFields;  // damit wir die in den input feldern direkt targetieren können
                                                                         // hierduch wird der state aber nichtgeändert, sondern nur entsprehcnend targetiert. geändert erst unter setFormFields

    // console.log(formFields)

    // const { setCurrentUser } = useContext(UserContext)

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("geklappt")        
        if(password !== confirmPassword) {
            alert("Passwörter passen nicht zusammen");
            return;
        }

        // try and catch weil we call den firebase server und das kann natürlich fehlschlagen
        try {
            const {user} = await createAuthUserWithEmailAndPassword(mail, password); //destructured von formFields

            // setCurrentUser(user); // wenn ein user sich jetzt für das erste mal registriert, ist der user auch im context gespeichert

            await createUserDocumentFromAuth(user, {displayName}); // erst hiermit wird der user wirklich in die Datenbank gepushed. Vorher immer nur im auth zu sehen
            resetFormFields();
        } catch(error) {
            if(error.code === "auth/email-already-in-use") {
                alert("die mail hast du bereits genutzt junge...");
            }
            console.log("fehler beim erstellen des users" ,error);
        };

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name)

        setFormFields({                     
            ...formFields,                  // alle nicht geänderten Felder bleiben so, wie sie aktuell sind mit ...formFields
            [name]: value                   // Computed Property Names --> [name]: holt sich den namen des aktuell triggernden InputFeldes -- Dynamic Keys
        })                                  // value ist der aktuelle wert des entsprechenden Inputfelds (mail: "wert, der gerade ins mail feld eingetragen wird")
    }                                                                  

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
             <span>Registriere dich mit deiner Email und Passwort an</span>
            <form onSubmit={handleSubmit}>
                <FormInput label={"Display Name"} required type="text" name="displayName" onChange={handleChange} value={displayName} />
                <FormInput label={"E-Mail"} required type="mail" name="mail" onChange={handleChange} value={mail} />
                <FormInput label={"Passwort"} required type="password" name="password" onChange={handleChange} value={password} />
                <FormInput label={"Passwort bestätigen"} required type="password" name="confirmPassword" onChange={handleChange} value={confirmPassword} />

                {/* <label htmlFor="displayName">Display Name</label>
                <input required type="text" name="displayName" onChange={handleChange} value={displayName} />

                <label htmlFor="mail">E-Mail</label>
                <input required type="email" name="mail" onChange={handleChange} value={mail} />

                <label htmlFor="password">Passwort</label>
                <input required type="password" name="password" onChange={handleChange} value={password} />

                <label htmlFor="confirmPassword">Passwort</label>
                <input required type="password" name="confirmPassword" onChange={handleChange} value={confirmPassword} /> */}
                <Button type="submit" >Abschicken</Button>
            </form>
        </div>
    )
}

export default SignInForm;