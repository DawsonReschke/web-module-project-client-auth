import React, { useEffect, useState } from "react";
import axiosWithAuth from "../AxiosAuth";
const axios = axiosWithAuth()
import { useHistory } from "react-router-dom";
export const FRIENDS_URL = 'http://localhost:9000/api/friends'

export default function FriendsList(props){
    const [friendsList,setFriendsList] = useState([]); 
    const history = useHistory();
    useEffect(()=>{
        if(!window.localStorage.getItem('Authorization')) history.push('/login')
    },[])
    const getFriendsList = () => { 
        axios.get(FRIENDS_URL)
            .then(res=>{
                setFriendsList(res.data)
            })
    }
    useEffect(()=>{
        getFriendsList()
    },[])

    return(
    <div>
        <h1>FRIENDS LIST</h1>
        {friendsList.map((friend,index) => <p key={index}>-{friend.name}-{friend.email}</p>)} 
    </div>)
}