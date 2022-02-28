import { Button, CardMedia, Paper } from '@material-ui/core'
import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { createConversationAction } from '../../redux/actions/conversationActions'
import useStyles from './usersPageStyles'

const UserIcon = ({user}) => {
    const currentUser = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [usersId, setUsersId] = useState({
        senderId: currentUser?.result?._id,
        receiverId: user?._id
    })

    const writeMessageHandler = (e) => {
        dispatch(createConversationAction(usersId))
        navigate('/messager')
    }

    const classes = useStyles()
  return (

    <Paper style={{width: '100%'}}>
        <div className={classes.user}>
        <div>
            <CardMedia className={classes.userAvatar} image={user?.avatar || 'https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png'}/>
        </div>
        <div>
        <Link type='button' to={`/user/${user?._id}`} style={{color: '#000', textDecoration: 'none'}}>
            {user?.name}
            </Link>
        </div>
       
        </div>
        {currentUser?.token ? (
            <Button
        onClick={writeMessageHandler}
        color='primary'
        >Write a message</Button>
        ) : (
            <div>
                Sign in to send a message
            </div>
        )}
        
    </Paper>
    
  )
}

export default UserIcon