import React from "react";
import "./form-input.styles.scss";

const FormInput = ( {label, ...otherProps}) => {        //hier könnte man auch ein Objekt (inputOptions) übergeben aber ich mache das mit spread operator
    return (
        <div className="group">
            <input className="form-input" {...otherProps} />
            {label && ( 
                <label 
                    className={`${otherProps.value.length ? "shrink" : ""} form-input-label`}>
                        {label}
                </label>)}
        </div>
    )
}

export default FormInput;


// if label exists, then render this label sagt er zu dem {label &&} oben. 