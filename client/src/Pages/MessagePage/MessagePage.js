import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createMessageAction, getConversationsAction} from '../../redux/actions/conversationActions'
import ConversationComponent from './ConversationsComponent/ConversationComponent'
import Message from './messageComponents/Message/Message'
import './messager.css'
import {io} from 'socket.io-client'
import axios from 'axios'

const MessagePage = () => {
    const [currentChat, setCurrentChat] = useState(null)
    const [currentUserChat, setCurrentUserChat] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState([]) 
    const user = JSON.parse(localStorage.getItem('profile'))
    const socket = useRef()

    useEffect(() => {
        socket.current = io('http://localhost:5000/')
        socket.current.emit("addUser", user?.result?._id);
        socket.current.on("getMessage", (data) => {
            // console.log(data)
            setArrivalMessage({
              sender: data.senderId,
              text: data.text,
              createdAt: Date.now(),
            });
          });
    }, [])

    useEffect(() => {
        arrivalMessage &&
        currentChat?.members.includes(arrivalMessage.sender) && 
        setCurrentUserChat([...currentUserChat, arrivalMessage])
      }, [arrivalMessage, currentChat])

    const [messageData, setMessageData] = useState({
        conversationId: currentChat?._id, 
        sender: user?.result?._id,
        text: ''
        })
        const {text} = messageData
    const dispatch = useDispatch()

    const {conversations} = useSelector(state => state.dialogs)

    useEffect(() => {
        setMessageData({...messageData, conversationId: currentChat?._id})
       
    }, [currentChat])

    useEffect(() => {
        if(currentChat) {
            const getMessages = async () => {
                try {
                  const res = await axios.get('http://localhost:5000/'+currentChat._id)
                  setCurrentUserChat(res.data)
              } catch (error) {
                console.log(error.message)
              }
              }
              getMessages()
        }
      }, [currentChat])


    //   console.log(currentUserChat)

    useEffect(() => {
        dispatch(getConversationsAction(user?.result?._id))
    }, [dispatch])

   

    const sendMessageHandler = async (e) => {
        e.preventDefault()
        
        const receiverId = currentChat?.members?.find(
            (member) => member !== user?.result?._id
          );
    //   console.log('received: ', receiverId)
          socket.current.emit("sendMessage", {
            senderId: user?.result?._id,
            receiverId,
            text: text,
          });
          
          try {
            const res = await axios.post('http://localhost:5000/', messageData)
                setCurrentUserChat([...currentUserChat, res.data])
                setMessageData({
                    text: ''
                })
           
        } catch (error) {
          console.log(error)
        }
        
       
 
    }

  return (
    <div>
      <div className="messenger">  
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations?.map((c, index) => (
                <div key={index} onClick={() => setCurrentChat(c)}>
                    <ConversationComponent dialog={c} currentUser={user}/>
                </div>
            ))}

          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {currentUserChat?.map((message, index) => (
                      <div key={index}>
                        <Message own={message.sender === user?.result?._id} message={message}/>
                      </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setMessageData({...messageData, text: e.target.value})}
                    value={text}
                  ></textarea>
                  <button className="chatSubmitButton" 
                  onClick={sendMessageHandler}
                  >
                    Send
                  </button>
                  
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
          </div>
        </div>
      </div>
  </div>
  )
}

export default MessagePage