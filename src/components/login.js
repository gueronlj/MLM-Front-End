import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'


const LoginForm = ({setCurrentUser, setLoginAccepted, session, setShowLogin}) => {
//------------take the credentials from form --------------------
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [online, setOnline] = useState(true)


   const inputUsername = (event) => {//updates value on input change
      setUsername(event.target.value)
   }
   const inputPassword = (event) => {//updates value on input change
      setPassword(event.target.value)
   }
//-----------On login---------------------------------
   const handleLogin = (event) => {
      event.preventDefault()
      axios //pass login credentials to get checked.
         .get(`https://mlm-backend-chat.herokuapp.com/sessions/login/${username}/${password}`)
         .then(() => {
            console.log('sending credentials');
         })
      axios//pass name of session to create.
         .post(`https://mlm-backend-chat.herokuapp.com/sessions/${username}`)
         .then(() => {
            console.log('Trying to create session');
            setLoginAccepted(true)
            console.log(`setting current username to ${username}`);
            setCurrentUser(username)
         })
  }

  // const handleLogin = () => {
  //     axios
  //      .get('https://mlm-backend-chat.herokuapp.com/users')
  //      .then((response) => {
  //          console.log(response);
  //          axios
  //          .put(`https://mlm-backend-chat.herokuapp.com/users/login/${username}`)
  //          .then(() => {
  //              console.log('you are logged in');
  //          })
  //      })
  // }

  const closeLogin = () => {
      setShowLogin(false)
  }

//---------------------------------------------------
   return (
      <div className="loginForm">
        <div className = "loginModalForm">
         <h2>Log in</h2>
             <form onSubmit={handleLogin}>
                Username: <input className="inputField" type='text' onChange={inputUsername}/><br/>
                Password: <input className="inputField" type='password' onChange={inputPassword}/><br/>
                <input type='submit'/>
             </form>
             <button className="modalClose" onClick={closeLogin}>CLOSE</button>
         </div>
      </div>
   )
}

export default LoginForm
