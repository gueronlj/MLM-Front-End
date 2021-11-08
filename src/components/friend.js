import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

const Friend = ({currentUser, friends, setFriends, targetFriend, setTargetFriend}) => {
    console.log(friends);

    const [friendListName, setFriendListName] = useState('')
    console.log(friendListName);

    const updateTargetFriend = (event) => {
        setTargetFriend(event.target.value)
    }

   const handleAddFriend = (event, friend) => {
      event.preventDefault()
      console.log('trying to add friend');
      axios
         .post(`http://localhost:3001/friends/${currentUser}/${targetFriend}`)
         .then((response) => {
            console.log('added friend');
            setFriends(response.data.friends)
            // setFriendListName(friend._id)
         })
   }

   const handleDeleteFriend = (event) => {
       event.preventDefault()
       console.log('trying to delete friend');
       axios
            .put(`http://localhost:3001/friends/${currentUser}/${friendListName}`)
            .then(() => {
                console.log('friend was deleted');
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
                            <img className="friendDelete" src ="https://cdn-icons.flaticon.com/png/512/4922/premium/4922255.png?token=exp=1636339728~hmac=7f7c48b4c19b2860ff28bd06f22bfebb"/>
                        </div>
                    )
                })}
            </ul>
        </div>

    )
}

export default Friend;
