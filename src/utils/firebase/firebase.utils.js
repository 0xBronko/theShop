import { initializeApp } from "firebase/app"; // um die app Instanz zu starten

//importiere die authentification library von firebase --- wird für das google sign in benötigt (entweder per popup oder redirect)
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"

import {
    getFirestore,   // firestore instanz starten
    doc,            // Zugriff auf document type in firebase (user)
    getDoc,         // get document data in firebase (for each user)
    setDoc          // set document data in firebase (for each user)
} from "firebase/firestore";

// Your web app's Firebase configuration von der Firebase Webseite. Das sind die Konfiguaraionsdaten zu diese speziellen Projekt
const firebaseConfig = {
    apiKey: "AIzaSyDiOjfAzd3SJXJvyGP2rhEb3oLWgC8Z94o",
    authDomain: "test-shop-6668c.firebaseapp.com",
    projectId: "test-shop-6668c",
    storageBucket: "test-shop-6668c.appspot.com",
    messagingSenderId: "634615670222",
    appId: "1:634615670222:web:29da64eb32dc34fef4379f"
  };
  
  // Initialize Firebase // SDK (Developer Kit)
const firebaseApp = initializeApp(firebaseConfig);

  // initialzie a provider / provider ist also immer eine neue Instanz von googleauthprovider (hat constructor und benotigt Argumente)
  // googleAuthProvider ist eine Klasse, die connected mit googleAuth ist. Deswegen new Keyword für neue Instanz
  // Und manchmal müssen wir mehrer verschiedene Provider erstellen, um verschiedene Daten zu bearbeiteten
  // man könnte zum Beispiel für signInWithRedirect einen anderen Provider mitgeben
const provider = new GoogleAuthProvider();
  // dann geben wir diesem Provider noch spezielle Instruktionen, wie er vorgehen soll / Ich denke mal, jeder User der dann den Provider nutzt, interagiert mit dieser überarbeiteteten
  // Version, da diese erst initialisiert wurde, jetzt angepasst und später aufgerufen wird
provider.setCustomParameters({          
    prompt: "select_account"             // jedes Mal, wenn jemand mit dem Provider interagiert, soll er jedes mal seinen account auswählen müssen
});                                     // Google will diese Einstellung/ Vorgehen und man muss es einfach wissen, dass man es so einstellen muss



// diese authentification wird woanders eingebunden
// Authentification Prozess ist immer gleich. Das ist keine Klasse, von der Unterschiedliche Objekte erstellt werden müssen
// deswegen kein new Keyword
export const auth = getAuth();

// ebenso müssen wir die Signin Logik woanders einbinden (button in SignIn Sektion) und als Parameter bekommt er einmal die authentification und den Provider
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


// Man braucht immer nur eine Authentification, egal für welchen Vorgang aber man könnte verschiedene Provider Konfiguraitionen für verschiedene Services benötigen
    // (   Deswegen bei getAuth() kein new keyword und bei    new GoogleAuthProvider() mit new Keyword   )



// ab hier werden die Daten dann angelegt bzw in firestore gespeichert

export const db = getFirestore()    // die hier geschaffene Instanz gibt uns 1mal acces zur Database jedes mal um etwas zu ändern?


// hier wollen wir die Daten, die wir von dem authentification service aus signIn Component zurückerhalten(nach sign in) übergeben
// und dann inside firestore speichern
export  const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    // in additional information wird wegen unten genannt, der displayname übergeben {displayName: "mike"}

    // prüfen, ob eine bestiimte Instanz vom document user bereits existiert (Referenz)
    // die Methode doc() nimmt drei argumente:
        // die Datenbank, die aufgerufen werden soll(firestore)
        // wie die entsprechende collection heißt (der folder) hier: users
        // der Unique identifier für den entsprechenden user (das document) -> hier übergeben wir aus dem auth service die "uid"
    const userDocRef = doc(db, "users", userAuth.uid)
    // console.log(userDocRef)
    // Bis hier hin, wird nach user login vom shop ein "leerer" Befehl mit user/userId an die Datenbank geschickt, weil noch nicht 
    // definiert wurde, wie die Daten verarbeitet werden sollen/ bzw. welche Daten abgefragt und gespeichert werden

    // mit getDoc versucht man die Daten zu einem Document zu erfassen. Also übergeben wir dem die user data von firestore, vom user der sich gerade authentifiziert hat
    // snapshot ist quasi die Dateien und ist auch ein SPEZIELLES OBJEKT
    const userSnapshot = await getDoc(userDocRef);
    // console.log(userSnapshot);
    // console.log(userSnapshot.exists()) // false, weil in meiner firestore database noch kein Eintrag zu diesem user vorhanden ist


    // now check if user Data exists
    // create/ set the document with the data from userAuth in my collection
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;    // relevanten Daten aus der userAut response
        const createdAt = new Date();               // aktuelles Datum erfassen
        
        try {
            await setDoc(userDocRef, {              // Daten in das Document auf firestore eintragen und dabei Folgende Konfigs beachten
                displayName,
                email,
                createdAt,
                ...additionalInformation            // display name wird bisher nicht angezeigt, da google auth das keyword selbst belegt. daher wird dann der name in diesen additional information gespeichert
            });
        } catch (error) {
            console.log("error creating the user", error);
        }
    }
    return userDocRef;
}

// INTERFACE LAYER FUNCTIONS

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;        // wenn weder email oder passwort agegeben ist, soll diese Funktion nicht ausgeführt werden (protect code)

    return await createUserWithEmailAndPassword(auth, email, password);
}

// Diese Helper Funktion ist für das log in 
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;        // wenn weder email oder passwort agegeben ist, soll diese Funktion nicht ausgeführt werden (protect code)

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () =>  signOut(auth);
// async weil wir abwarten wollen, was signOut für ein promise returned


// a callback everytime i want to call when auth state changes
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);