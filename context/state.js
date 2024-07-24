"use client"
import {createContext, useState} from 'react';

export const StateContext = createContext();



export default function State ({children}){
    const [name, setName] = useState ("");
    const [Lname, setLName] = useState ("");
    const [emailad, setEmailad] = useState ("");



    const context = {name, setName, Lname, setLName, emailad, setEmailad} 
   

    return <StateContext.Provider value ={context} >
        {children}
    </StateContext.Provider>
}