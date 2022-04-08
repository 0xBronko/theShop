import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { CartContext } from "../../context/cart.context";

import { UserContext } from "../../context/user.context"

import { signOutUser } from "../../utils/firebase/firebase.utils"

import "./navigation.styles.scss";

const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);    // hier extrahieren wir den aktuellen User aus dem context
    // console.log(currentUser);                           // immer, wenn sich der user state nun ändert, wird auch diese component gerendert

    // const signOutHandler = async () => {
    //     await signOutUser();
    //     setCurrentUser(null); // damit ist der currentUser wieder im context auf null gesetzt
    // }

    const {isCartOpen} = useContext(CartContext);

    return (
        <>
            <div className="navigation">

                <Link className="logo-container" to="/">
                    <CrwnLogo />
                </Link>

                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">SHOP</Link>
                    {
                        currentUser ? (<span className="nav-link" onClick={signOutUser}>SIGN OUT</span>)
                            : (<Link className="nav-link" to="/auth">SIGN IN</Link>)
                    }
                <CartIcon />
                </div>
                {isCartOpen && <CartDropdown />} {/* logik, wenn is cart open true, render cartdropdown */}
            </div>
            <Outlet />
        </>
    )
}

export default Navigation;


// jsx mit current user = when there is a current user -> use a different link, when current user does not exists, render
// the sign in link

// SignOut= wenn man hier einfach nur die signOut Methode importiert und ausführt, muss man den status auch an den context übergeben,
// damit er immer weiß ob user gerade eingeloggt ist oder nicht --> deswegen signouthandler