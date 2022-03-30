import React,{useState} from "react"
import { useHistory } from "react-router-dom"
const initialFormValues = {
    username:'',
    password:''
}

export default function Login(props){
    const history = useHistory()
    const {login} = props
    const [form,setForm] = useState(initialFormValues)

    const onChange = evt =>setForm({...form,[evt.target.name]:evt.target.value})
    const onSubmit = evt =>{
        evt.preventDefault(); 
        login(form)
        history.push('/friends')
    }
    return(
    <form onSubmit={onSubmit}>
        <h1>LOGIN</h1>
        <label>USERNAME</label>
        <input
            name="username"
            value={form.username}
            onChange={onChange}
        />
        <label>PASSWORD</label>
        <input
            name="password"
            value={form.password}
            onChange={onChange}
        />
        <input type={'submit'}/>
    </form>
    )
}