import firebase from 'firebase/app'

export const createIdCollection = (collection: string) => {
  return firebase.firestore().collection(collection).doc().id
}
