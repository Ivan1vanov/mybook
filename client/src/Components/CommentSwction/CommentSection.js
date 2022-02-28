import { Paper } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useStyles from './commentSectionStyles'

const CommentSection = ({comment}) => {

    const classes = useStyles()
    const [authoCOmment, setAuthorComment] = useState([])
    console.log(authoCOmment)
    useEffect(() => {
        const getUser = async () => {
          try {
            const res = await axios(`https://ivansbook.herokuapp.com/api/users/user/${comment.commentCreator}`);
            console.log(res?.data?.user)
            setAuthorComment(res?.data?.user);
          } catch (err) {
            console.log(err);
          }
        };
        getUser();
      }, []);

  return (
    <div>
        <Paper>
            <div className={classes.heighPartOfComment}>
            <img className={classes.userAvatar} src={authoCOmment?.avatar || 'https://www.alcanotomotiv.com/uploads/thumbs/no-image.svg'}/>
                <Link 
                style={{color: '#000', textDecoration: 'none'}}
                to={`/user/${comment.commentCreator}`}>  {comment.creatorName}</Link> 
        
            </div>
          {comment.comment}
        </Paper>
       
    </div>
  )
}

export default CommentSection