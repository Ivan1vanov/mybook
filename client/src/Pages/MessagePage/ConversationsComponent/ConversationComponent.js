import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurretuserAction } from '../../../redux/actions/userActions'
import './conv.css'

const ConversationComponent = ({dialog, currentUser}) => {
    const dispatch = useDispatch()
    const [friend, setFriend] = useState([])

    useEffect(() => {
        const friendId = dialog.members.find(f => f !== currentUser?.result?._id)
    
        const getUser = async () => {
          try {
            const res = await axios(`http://localhost:5000/${friendId}`);
            setFriend(res?.data?.user);
          } catch (err) {
            console.log(err);
          }
        };
        getUser();
      }, []);


  return (
    <div className="conversation">
    <img
      className="conversationImg"
      src={
          'https://hope.be/wp-content/uploads/2015/05/no-user-image.gif'
      }
      alt=""
    />
    <span className="conversationName">
      {friend?.name}
        </span>
  </div>
  )
}

export default ConversationComponent