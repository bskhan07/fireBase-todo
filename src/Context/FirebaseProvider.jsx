import { createContext, useContext, useEffect, useState, } from "react";
const FireBaseContext = createContext()
import { getFirestore, addDoc, collection, doc, getDocs, deleteDoc, updateDoc } from "firebase/firestore"


import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyDtYjtbY-_WC4Ij_hn71Dh7oU6WmE92xX4",
    authDomain: "todo-5537e.firebaseapp.com",
    projectId: "todo-5537e",
    storageBucket: "todo-5537e.appspot.com",
    messagingSenderId: "84942470105",
    appId: "1:84942470105:web:c137dcfa3295a8763d37c8"
};
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const ref = collection(db, "Todo")



export const usefireBase = () => {
    return useContext(FireBaseContext)
}


export const FireBaseProvider = ({ children }) => {


    useEffect(() => {
        getItems()
    }, [])

    const [items, setItems] = useState()

    const [loading, setLoading] = useState(false)

    const addData = async (data) => {
        setLoading(true)
        try {
            await addDoc(ref, data)
            getItems()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    const getItems = async () => {
        setLoading(true)
        try {
            const res = await getDocs(ref)
            setItems(res)

        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }
    const Delete = async (id) => {
        setLoading(true)
        try {
            await deleteDoc(doc(db, "Todo", id))
            getItems()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    const updateTask = async ({ updateId, input, date }) => {
        setLoading(true)
        try {
            const ref = doc(db, "Todo", updateId)
            await updateDoc(ref, {
                input: input,
                updateDate: date
            })
            getItems()
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <FireBaseContext.Provider value={{ addData, db, items, Delete, updateTask, loading }} >
            {children}
        </FireBaseContext.Provider>
    )
}
