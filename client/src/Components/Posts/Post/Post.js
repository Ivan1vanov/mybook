import { Button, Card, CardMedia} from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';
import useStyles from './postStyles'
import { useDispatch, useSelector } from 'react-redux'
import { deletePostAction, likePostAction } from '../../../redux/actions/postActios';



import './post.css'

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import { Link } from 'react-router-dom';
import { getCurretuserAction } from '../../../redux/actions/userActions';
import axios from 'axios';
import moment from 'moment'
import Form from '../../Form/Form';

const Post = ({post, setCurrentPostId}) => {
  const dispatch = useDispatch()
  const currentUser = JSON.parse(localStorage.getItem('profile'))
  const classes = useStyles()
  const [postCreator, setPostCreator] = useState([]) 

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios(`http://localhost:5000/${post.creator}`);
        // console.log(res?.data?.user)
        setPostCreator(res?.data?.user);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  return <Card className={classes.card}>
    <Link to={`/user/${postCreator?._id}`} style={{textDecoration: 'none', color: '#000'}}>
    <div className={classes.autorDetailt}>
      
   <img className={classes.userAvatar} src={postCreator?.avatar || 'https://www.alcanotomotiv.com/uploads/thumbs/no-image.svg'}/>
     
    <div style={{marginLeft: '10px', display: 'flex', justifyContent: 'space-between', width: '90%'}}>
      <div>
    {post.author || <div>User Name</div>}
    </div>
    <div>
    {moment(post.createdAt || post.updatedAt).fromNow()}
    </div>

    </div>
    
   
    </div>
    </Link>
    <div>
      {post.text}
    </div>
    
    <div style={{color: 'blue'}}>
      {post.tags.split(' ').map((tag, index) => (
        <span key={index}> #{tag}</span>
      ))}
    </div>
        {post.image && (
          <CardMedia className={classes.cardMedia} image={post.image} title='title' /> 
        )}
    
    {/* <img width='500px' src={post.image || 'https://www.alcanotomotiv.com/uploads/thumbs/no-image.svg'} /> */}

        {/*------- like Button ----------*/}
    <div className={classes.buttonsActions}>
        {currentUser?.token ? (
          <Fragment>
        <Button className='likeButton' onClick={() => dispatch(likePostAction(post._id))}>
              <div>
              {post.likes.length} 
              </div>
            
              {post.likes.find(like => like === currentUser?.result?._id) ? (
                <div>
                  <div className='likedIconHeart'>
                  <FavoriteIcon style={{color: '#ff3347a1', fontSize: '20px'}}/>
                  </div>
                </div>

              ): (
                <div>
                <FavoriteBorderIcon style={{fontSize: '20px'}}/>
              </div>
              )}
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            Sign in to like a post
          </Fragment>
        )}
    
      <Button>
        <Link to={`/posts/${post._id}`} style={{color: '#000', textDecoration: 'none'}}>
        {post.comments.length} <ChatBubbleOutlineIcon/>
        </Link>
       
      </Button>

      {/*------- delete Button ----------*/}
      {post.creator === currentUser?.result?._id && (
        <Button onClick={() => dispatch(deletePostAction(post._id))}>
        Delete
      </Button>
      )}

      {/*------- update Button ----------*/}
      {post.creator === currentUser?.result?._id && (
        <Button onClick={() => setCurrentPostId(post._id)}>
        Edit
      </Button>
      )}
      
    
    </div>
  </Card>
};

export default Post;
