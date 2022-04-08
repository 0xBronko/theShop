import React from "react";
import "./button.styles.scss"

// we know that we are going to have 3 different button types, so... how to make this component generic and availabale for all
// three types?
// create variable buttontypes -> if the value passed is the string "xyz" dann soll folgende klasse hier ausgegeben werden

const BUTTON_TYPE_CLASSES = {
    google: "google-sign-in",
    inverted: "inverted"
};


const Button = ({children, buttonType, ...otherProps}) => { //Children ist hier einfach der Text, der im parent für den Button gesetzt wurde(children ist anscheinend ein Keyword und kann nicht anders heißen)
    return(
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
         {...otherProps}>
            {children}</button>
    )
}

export default Button;