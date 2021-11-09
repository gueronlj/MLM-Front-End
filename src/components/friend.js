import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

const Friend = ({currentUser, friends, setFriends, targetFriend, setTargetFriend}) => {

    const [deleteTarget, setDeleteTarget] = useState()

    const updateTargetFriend = (event) => {
        setTargetFriend(event.target.value)
    }

   const handleAddFriend = (event) => {
      event.preventDefault()
      console.log('trying to add friend');
      axios
         .post(`https://mlm-backend-chat.herokuapp.com/friends/${currentUser}/${targetFriend}`)
         .then((response) => {
            console.log('added friend');
            setFriends(response.data.friends)
         })
   }

   const handleDeleteFriend = (event) => {
       event.preventDefault()
       console.log(event.target.previousSibling.innerText);//found using inspector tool to find properties of elements.
       axios
            .put(`https://mlm-backend-chat.herokuapp.com/friends/${currentUser}/${event.target.previousSibling.innerText}`)
            .then((response) => {
                console.log('friend was removed');
                setFriends(response.data.friends)
            })
   }

   // <img className = "friendDelete" src = "./deletefriend.png"/>



    return (
        <div className = "friendList">
            <h2>Friends List</h2>
            {currentUser==='Guest'? //do not show friends list if logged in as guest
            <>
               <p>Please login to see friends</p>
            </>
            :
            <>
               <form id='friendSearch' onSubmit={handleAddFriend}>
                  Search user:<input type='text' onChange={updateTargetFriend}/>
                  <input type='submit' value='Add Friend'/>
               </form>
               <ul>
                   {friends.map((friend) => {
                       return (
                           <div key={friend._id} className="friendCard">
                               <li className = "friendNames" >{friend.username}</li>
                               <form onSubmit={handleDeleteFriend} id='friendToRemove'>
                                 <input type='hidden' value={friend.username}  />
                                 <input type='submit'value="-" className='friendRmvBtn'/>
                               </form>
                           </div>
                       )
                   })}
               </ul>
            </>
            }
        </div>

    )
}

export default Friend;
