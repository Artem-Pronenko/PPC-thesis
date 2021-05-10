import firebase from 'firebase/app'

export type FirebaseContextProps = {
  firebase: any,
  auth: firebase.auth.Auth,
  user: firebase.User | null,
  db: firebase.firestore.Firestore
}

