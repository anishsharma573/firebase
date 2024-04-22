import { useState } from "react"
import { auth, googleProvider } from "../config/firebaseconfig"
import {createUserWithEmailAndPassword,signInWithPopup,signOut} from 'firebase/auth'


export const Auth =()=>{
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")

    const signIn = async ()=>{
       try {
        await createUserWithEmailAndPassword(auth,email,password)
       } catch (error) {
        console.error(error)
       }
    };
    const signInWithGoogle = async ()=>{
        try {
         await signInWithPopup(auth,googleProvider)
        } catch (error) {
         console.error(error)
        }
     };
    const Logout = async ()=>{
        try {
         await signOut(auth)
        } catch (error) {
         console.error(error)
        }
     };
    return(
        <div>
        <input placeholder="Email.."
        onChange={(e)=>setEmail(e.target.value)}/>
        <input placeholder="password"
        type="password"
          onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={signIn}>Sign In</button>
        <button onClick={signInWithGoogle}>Google</button>
        <button onClick={Logout}>Logout</button>
    </div>
    )
}


