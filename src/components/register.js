import React from 'react'
import {useState} from 'react'
import axios from 'axios'

const Register = ({setShowRegister}) => {
   const [ newUser, setnewUser] = useState('')
   const [ newPassword, setnewPassword ] = useState('')

//---------------take the credentials from form input--------------------
   const updatenewUser = (event) => {
      setnewUser(event.target.value)
   }

   const updatenewPassword = (event) => {
      setnewPassword(event.target.value)
   }
//---------------on form submit--------------------------------
   const handleRegistration = (event) => {
      setnewUser(event)
      axios.post(`https://mlm-backend-chat.herokuapp.com/users`,
         {
            username:newUser,
            password:newPassword,
         }
      ).then(() => {
         axios
            .get('https://mlm-backend-chat.herokuapp.com/')
            .then((response) => {
               console.log(response);
            })
      })
   }

   const closeRegister = () => {
       setShowRegister(false)
   }

   return (
    <div className="registerForm">
        <div className="registerModalForm">
            <h2>Make an account</h2>
            <form onSubmit={handleRegistration}>
            Username: <input className="inputField" type='text' onChange={updatenewUser}/><br/>
            Password: <input className="inputField" type='password' onChange={updatenewPassword}/><br/>
            <input type='submit'/>
            </form>
            <button className="modalClose" onClick={closeRegister}>Close</button>
        </div>
    </div>
   )
}

export default Register
