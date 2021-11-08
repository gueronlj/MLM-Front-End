# MLM app
A full-stack SPA build using MERN
_________________________________________________________________________________________
##Key Features
### Messaging
For now, messages will be stored and viewed in a 'common space' that all other users can see. A user can edit or remove a message in this space as long as they are the author of the message.
-------------------------------------------------------------------------------
### Users/'Sessions'
We want to be able to have users log in and have their own friends list and maybe private messages. Without express.sessions we needed to create a new way to manage user 'sessions'.
1. When a user logs in, a session will be created with their name. This object will have a current user (another object), a name(same as current user) and a boolean property (online or offline.
2. When a user logs in, their name will be kept in local storage until they log out.
3. On load, check the name in local storage and retrieve the matching session info.
------------------------------------------------------------------------------------
###Friends List
#### Add friend:
Every user object has an array called 'friends'. On click, the 'add friend' button will make an axios call to search for a user with the given name and push that found user into the current user's 'friends array'
#### Remove friend:
We will make a similar axios call as 'Add friend' except we will use the splice method to remove the friend from the array. To splice the correct index, we will use a function to find the index of 'friends array' with a matching name of the friend we want to remove.
__________________________________________________________________________________________
##Current Bugs:
###CORS:
Some systems get CORS errors, others do not. A chrome extension can be installed on a problem system to fix the error. If the CORS error is not fixed that system will not be able to use the app.
###Friends List:
A user's friends seem to 'disappear' on refresh but the correct data for the friends array is still there.
###Remove Friend:
The remove friend function is not splicing the right user out. It always picks index [0].
###Login Functionality
The application is able to verify if the username exists within the database, but it is unable to check whether the password matches with the user password in the User database.
_____________________________________________________________________________________
##User Stories:
-A user's message should be displayed in a public space where other users can see it.
-Users should be able to post/edit/remove a message they create.
-A user can log in and out and their session should persist through a refresh.
-A user should have a friends list where they can add/remove other users
-A user can send a private message or 'whisper' to a friend.
-The friends list should only appear when activated, and only be available to a registered user.
_______________________________________________________________________________
##Challenges:
###Keeping the important data on refresh.
###Heroku Deployment
__________________________________________________________________________
## Notes:
####Issue: 'session' info is lost on refresh.
####Solution??: Somehow store the session state in local storage.
On login, user gains a session object
Session = {
   name: String,
   online: Boolean
}
const = [online, setOnline] = useState('false')
OnLogin => make axios call to findOneAndUpdate({username},
   session:{
      name:username from login form,
      online:true
   }
   setOnline(true)
   *On login, save online state to local storage
OnLogout => make axios call to findOneAndUpdate({username},
   session:{
      name:Username,
      online:false
   }
   setOnline(false)
useEffect( retrieve online state from local storage )
online ? show logout button : show login button
------------------------------------------------------------------------------
const checkStatus = (NAME) => {
//find a session with this NAME;
   if foundSession.online == true,
      return true'
   else
      return false
}
checkStatus(username)? Print Welcome username! :
