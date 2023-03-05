// hooks
import { useEffect, useState } from "react"

// firebase config
import { projectFirestore } from "../firebase/config"


export const useDocument = (collection, docId) => {

    const [error, setError] = useState(null)
    const [document, setDocument] = useState(null)
    
    // realtime data
    useEffect(() => {

        setError(null)

        const unsubscribe = projectFirestore.collection(collection).doc(docId)
                .onSnapshot((doc) => {
                    if(doc.data()){
                        setDocument({ ...doc.data(), id: doc.id })
                        setError(null)  
                    } else{
                        setError('project does not exist')
                    }            
                }, (err) => {
                    setError(err.message)
                })

        return () => unsubscribe()

    }, [collection, docId])

    return { error, document }
}