import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBPWZ33RZYeY5cVYZoR935kB-_CxJq5Id4",
    authDomain: "crwn-db-f00f8.firebaseapp.com",
    projectId: "crwn-db-f00f8",
    storageBucket: "crwn-db-f00f8.appspot.com",
    messagingSenderId: "196093351631",
    appId: "1:196093351631:web:1c861500454e0198ebc9ba",
    measurementId: "G-7JQJY1W8RV"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {

    if(!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get()

    if(!snapShot.exists){
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;