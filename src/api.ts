import firebase from 'firebase/app'
const auth = firebase.auth()

export const authUser = () => {
  return auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
}

export const signOutUser = () => {
  return auth.signOut()
}

