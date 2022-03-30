import axios from 'axios'

export default function axiosWithAuth(){
    return axios.create({
        headers:{Authorization:window.localStorage.getItem('Authorization')}
    })
}