import React, { useState } from "react";
import axiosWithAuth from "../AxiosAuth";
import { FRIENDS_URL } from "../App";
const axios = axiosWithAuth()
const initialFormState = {
    name:'',
    email:''
}
export default function AddFriend(){
    const [friendForm,setFriendForm] = useState(initialFormState)
    
    const createNewUser = () => {
        axios.post(FRIENDS_URL,friendForm)
            .then(res=>{
                console.log(res.data)
            })
            .catch(e=>{
                console.log(e.response.data)
            })
    }

    const onChange = evt => { 
        setFriendForm({
            ...friendForm,
            [evt.target.name]:evt.target.value
        })
    }

    const onSubmit = evt => { 
        evt.preventDefault(); 
        createNewUser()
        setFriendForm(initialFormState)
    }

    return (
        <form onSubmit={onSubmit}>
            <label>FRIEND NAME</label>
            <input
                value={friendForm.name}
                onChange={onChange}
                name="name"
            />
            <label>FRIEND EMAIL</label>
            <input
                value={friendForm.email}
                onChange={onChange}
                name="email"
            />
            <input type={'submit'}/>
                
        </form>
    )
}