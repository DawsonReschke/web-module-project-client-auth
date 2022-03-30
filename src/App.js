import React from 'react'
import styledComponents from 'styled-components';
import axiosWithAuth from './AxiosAuth/index.js';
const axios = axiosWithAuth()
import './App.css';
import Login from './components/Login'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import FriendsList from './components/FriendsList.js';
import AddFriend from './components/AddFriend.js';
import { NavLink,useHistory } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

export const LOGIN_URL = 'http://localhost:9000/api/login'
export const LOGOUT_URL = 'http://localhost:9000/api/logout'
export const FRIENDS_URL = 'http://localhost:9000/api/friends'
export const ARTICLES_URL = 'http://localhost:9000/api/articles'

const NavBar = styledComponents.div`
display:flex;
justify-content:center;
width:100vw;
flex-direction:row;
`

const NavLinks = styledComponents.nav`
display:flex;
  a {
    display:flex;
    align-items:center;
    margin:2%;
    height:100%;
    padding:2%;
    text-decoration:none;
    text-align:center;
    background-color:black;
    color:white;
  }
`


function App() {
  const history = useHistory()
  const getLoginToken = ({username,password}) =>{
    axios.post(LOGIN_URL,{username,password})
      .then(res=>{
        const token = res.data.token;
        window.localStorage.setItem('Authorization',token)
      })
      .catch(e=>{
        const message = e.response.data.message
      })
  }

  const removeLoginToken = () => { 
    axios.post(LOGOUT_URL).
      then(()=>{
        window.localStorage.removeItem('Authorization')
        history.push('/login')
      })
      .catch(e=>console.log(e))
  }

  const navToLink = (link) => {
    history.push(link)
  }

  const testAuthorization = () => { 
    console.log('ere')
    console.log(window.localStorage.getItem('Authorization'))
    return window.localStorage.getItem('Authorization') ? true : false
  }

  return (
    <div className="App">
      <NavBar>
        <p>FRIENDS DATABASE</p>
        <NavLinks>
          <NavLink onClick={navToLink('/login')} to={'/login'}>LOGIN</NavLink>
          <NavLink onClick={navToLink('/friends')} to={'/friends'}>FRIENDS LIST</NavLink>
          <NavLink onClick={navToLink('friends/add')} to={'/friends/add'}>ADD FRIEND</NavLink>
          <NavLink onClick={removeLoginToken} to={'/login'}>LOGOUT</NavLink>
        </NavLinks>
      </NavBar>
      <Switch>
        <Route exact path={'/'}>
          {/** check if logged in, if so redirect, if not redirect */}
        </Route>
        <Route exact path={'/login'}>
          <Login login={getLoginToken}/>
        </Route>
        <Route exact path={'/friends'}>
            {<FriendsList/>}
        </Route>
        <Route exact path={'/friends/add'}>
          {testAuthorization() ? <AddFriend/> : <Redirect to={'/login'}/>}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
