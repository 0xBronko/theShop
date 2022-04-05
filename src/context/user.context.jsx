import React, {useState, createContext, useEffect } from "react";

import { onAuthStateChangedListener, signOutUser, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils"

// the actual value we want to access 
// pass/create the default value
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});


// provider is the actual component
// the provider allows any of its child components to access the state inside of its useState
export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    // signOutUser(); // as soon as this userprovider mounts -> sign out

    useEffect(()=> {    // 
        const unsubscribe = onAuthStateChangedListener((user) => {  // receives callback function and passes this callback function as second parameter to onauthstagechange in firebase utils
            // console.log(user)
            if(user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user); // signout = null / wenn signed in ist user = authenticated user objekt
        })
        return unsubscribe;
    }, [])

    return (
        <UserContext.Provider value={value}> 
            {children}
        </UserContext.Provider>
    )
};