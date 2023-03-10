import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../App'

import axios from 'axios'
import { ChatContext } from '../Pages/UserPage'

export default function FriendList() {

  const { currentUser, setCurrentUser } = useContext(UserContext)
  const { setCurrentChatter } = useContext(ChatContext)

  const [friends, setFriends] = useState()

  useEffect(() => {
    updateFriends()
  }, [])

  function updateFriends() {
    console.log('updating friends')
    axios.post(`/user/update-user`, ({id: currentUser._id}))
    .then(res => {
      console.log(res.data)
      setFriends(res.data[0].friendList)
    })
  }

  function updateCurrentChatter(e) {
    console.log('setting currentChatter')
    
    axios.get(`/user/friend/${friends[e.target.value].friendCode}`)
    .then(res => {
      console.log('got chatter')
      setCurrentChatter(res.data)
    })
  }

  return (
    <div className="container flex column">
      
      <p>Friends: </p>

      <ul className="friend-list small-container">

        { friends ? 
          friends.map((friend, i) => {
            if (friend.username && friend.friendCode) {
              return ( 
                <li key={friend.friendCode} value={i} onClick={updateCurrentChatter}> {friend.username} </li>
              )
            }
          })
          : console.log('no user to display')
        }
      </ul>
      <button onClick={updateFriends}>Refresh</button>
    </div>
  )
}
