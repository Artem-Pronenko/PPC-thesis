import firebase from 'firebase/app'
import 'firebase/firestore'
import {useState, useEffect, useCallback} from 'react'

export const SUCCESS_RESPONSE: string = 'success'
export const LOADING_RESPONSE: string = 'loading'

interface IOptions {
  body: {}
  idDoc?: string
  isMerge?: boolean
}

interface ISuccess {
  type: string
}

interface UseFirestoreSet {
  setDB: (options: IOptions) => any
  isLoading: boolean
  response: ISuccess
  error: firebase.firestore.FirestoreError | null
}

const initialOptions = {
  body: {},
  url: '',
  isMerge: false
}

const useFirebaseSet = (url: string): UseFirestoreSet => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [response, setResponse] = useState<ISuccess>({type: LOADING_RESPONSE})
  const [error, setError] = useState<firebase.firestore.FirestoreError | null>(null)
  const [options, setOptions] = useState<IOptions>(initialOptions)
  const firestore = firebase.firestore()


  const setDB = useCallback((options) => {
    setOptions(options)
    setIsLoading(true)
  }, [])

  useEffect(() => {
    ;(async () => {
      if (!isLoading) return
      try {
        let idDoc = options.idDoc
        const body = options.body
        const snapshot = firestore.collection(url).doc(idDoc)
        idDoc = idDoc ?? snapshot.id
        await snapshot.set({
          ...body, idDoc
        }, {merge: options.isMerge})
        setResponse({type: SUCCESS_RESPONSE})
      } catch (e) {
        setError(e)
      } finally {
        setIsLoading(false)
      }
    })()
    return () => {
    }
  }, [isLoading, options, url, firestore])

  return {isLoading, response, error, setDB}

}

export default useFirebaseSet
