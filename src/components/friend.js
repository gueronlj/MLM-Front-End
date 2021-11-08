import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

const Friend = ({currentUser, friends, setFriends, targetFriend, setTargetFriend}) => {
    console.log(friends);

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
       axios
            .put(`https://mlm-backend-chat.herokuapp.com/friends/${currentUser}/${event.target.value}`)
            .then((response) => {
                console.log('friend was removed');
                setFriends(response.data.friends)
            })
   }

    return (
        <div className = "friendList">
            <h2>Friends List</h2>
            <form onSubmit={handleAddFriend}>
               Search user:<input type='text' onChange={updateTargetFriend}/>
               <input type='submit' value='Add Friend'/>
            </form>
            <ul>
                {friends.map((friend) => {
                    return (
                        <div key={friend._id} className="friendCard">
                            <li className = "friendNames" >{friend.username}</li>
                            <form onSubmit={handleDeleteFriend}>
                              <input type='hidden' value={friend.username}/>
                              <input type='submit'value="Remove"/>
                            </form>
                        </div>
                    )
                })}
            </ul>
        </div>

    )
}

export default Friend;
