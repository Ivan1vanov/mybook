import { Button, Grid, Input, Paper, TextField, Typography } from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { commentPostAction, getPostDetailsAction, likePostAction } from '../../redux/actions/postActios'
import useStyles from './poatDetailsStyles'

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentSection from '../../Components/CommentSwction/CommentSection'

const PostDetails = () => {
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const {id} = useParams()

    const [commentData, setCommentData] = useState({
        creatorName: user?.result?.name,
        commentCreator: user?.result?._id,
        comment: ''

    })
    console.log(id)

    const {post} = useSelector(state => state.posts)
    const [comments, setComments] = useState(post?.comments);

    useEffect(() => {
        dispatch(getPostDetailsAction(id))
    }, [dispatch])

    
    useEffect(() => {
        setComments(post?.comments)
        }, [post])
   
    const onChangeCommentHandler = (e) => {
        setCommentData({
            ...commentData,
            [e.target.name]: e.target.value
        })
    }
    

    const commentPostHandler = async (e) => {
        e.preventDefault()
        const newComments = await dispatch(commentPostAction(id, commentData))
        console.log(newComments)
        setComments(newComments);
    }


        console.log(comments)

    const classes = useStyles()
  return (
      <Fragment>
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
              <Typography variant="h6">Created by: {post?.author}</Typography>
          <div className={classes.card}>
            <div className={classes.section}>
              {/* <Typography variant="h3" component="h2">title</Typography> */}
              <Typography gutterBottom variant="h6" color="textSecondary" component="h2" style={{borderBottom: `1px solid rgba(128, 128, 128, 0.74)`}}>
              {post?.tags.split(' ').map((tag, index) => (
                <span key={index}> #{tag}</span>
                ))}
              </Typography>
              <Typography gutterBottom variant="body1" component="p">{post?.text}</Typography>
             
              <Typography variant="body1">
                  {/* {moment(post?.createdAt).fromNow()} */}
                  </Typography>
              {/* <Divider style={{ margin: '20px 0' }} />
              <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
              <Divider style={{ margin: '20px 0' }} />
             
                  <CommentsSection post={post}/>
              
              <Divider style={{ margin: '20px 0' }} /> */}
               <Button className='likeButton' onClick={() => dispatch(likePostAction(post._id))} style={{position: 'absolute', 
               bottom: '10px',
               marginTop: '100%'}}>
                    <div>
                    {post?.likes.length} 
                    </div>
                
                    {post?.likes.find(like => like === user?.result?._id) ? (
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
            </div>
            <div className={classes.imageSection}>
              <img className={classes.media} src={post?.image || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={`title`} />
            </div>
           
          </div>
          {/* {!!recommendedPosts?.length && (
            <div className={classes.section}>
              <Typography gutterBottom variant="h5">You might also like:</Typography>
              <Divider />
              <div className={classes.recommendedPosts}>
                {recommendedPosts?.map(({ title, name, message, likes, image, _id }) => (
                  <div style={{ margin: '20px', cursor: 'pointer' }} 
                  onClick={() => openPost(_id)} 
                  key={_id}>
                    <Typography gutterBottom variant="h6">{title}</Typography>
                    <Typography gutterBottom variant="subtitle2">{name}</Typography>
                    <Typography gutterBottom variant="subtitle2">{message}</Typography>
                    <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                    <img src={image} width="200px" />
                  </div>
                ))}
              </div>
            </div>
          )} */}
        </Paper>
        <div className={classes.section}>
        <Paper className={classes.paper} style={{ padding: '20px', borderRadius: '15px' }} >
            {user?.token ? (
            <form className={classes.form} onSubmit={commentPostHandler}>
            <Input
                style={{width: '50%'}}
                name='comment'
                placeholder='How is your oppinion?'
                multiline
                rows={4}
                onChange={onChangeCommentHandler}
                />

                <div>
                <Button 
                type='submit'
                style={{backgroundColor: 'rgb(77, 184, 255)', color: '#fff', width: '50%', margin: '10px'}}
                variant='contained'
                >Leave a comment</Button>
                </div>
                </form> 
            ) : (
                <Fragment>
                     <Grid item>
                         <Paper style={{
                             width: '70%',
                             textAlign: 'center',
                             margin: '10px auto',
                             padding: '12px',
                             fontSize: '25px'
                         }}>
                             Sign in to leave a comments
                         </Paper>
                     </Grid>
                </Fragment>
            )}
       
        </Paper>
        <Typography gutterBottom variant="h6">Comments</Typography>
        {comments?.map((comment, index) => (
            <Typography gutterBottom variant="h6" key={index}>
            <CommentSection comment={comment} />
            </Typography>
        ))}
            </div>
        
        </Fragment>

  )
}

export default PostDetails