import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyD4NS3Uj02IOIgkAe7IURquWmSW8u4ro9A',
  authDomain: 'nva-crwn-clothing-db.firebaseapp.com',
  databaseURL: 'https://nva-crwn-clothing-db.firebaseio.com',
  projectId: 'nva-crwn-clothing-db',
  storageBucket: 'nva-crwn-clothing-db.appspot.com',
  messagingSenderId: '901264154146',
  appId: '1:901264154146:web:7412793f0a294f13d1347b'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
