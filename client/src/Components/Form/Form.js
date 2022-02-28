import { Button, Container, Input, Paper, TextareaAutosize, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import useStyles from './formStyles'
import FileBase64 from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createPostAction, updatePostAction } from '../../redux/actions/postActios'
import { useNavigate } from 'react-router-dom'

const Form = ({setCurrentPostId, curretnpostId}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('profile')) 
  const [postData, setPostData] = useState({
    text: '',
    tags: '',
    image: '',
    author: user?.result?.name
  })

  const post = useSelector(state => curretnpostId ? state.posts.posts.find(post => post._id === curretnpostId) : null)

  const {text, tags, image} = postData

  const onChangePost = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value
    })
  }

  const createPostHandler = (e) => {
    e.preventDefault()
    if(curretnpostId) {
      dispatch(updatePostAction(curretnpostId, postData))
      setPostData({
        text: '',
        tags: '',
        image: '',
        author: user?.result?.name
      })
      setCurrentPostId('')
    } else {
      dispatch(createPostAction(postData, navigate))
      setPostData({
        text: '',
        tags: '',
        image: '',
        author: user?.result?.name
      })
      setCurrentPostId('')
    }
  }

  useEffect(() => {
      if(curretnpostId) {
        setPostData(post)
      }
  }, [curretnpostId])

  const classes = useStyles()
  return (
    <Container>
     <Paper className={classes.paper}>
        <form className={classes.form} onSubmit={createPostHandler}>
        <Input
            name='text'
            placeholder='How is your live?'
            multiline
            rows={4}
            value={text}
            onChange={onChangePost}
            className={classes.input}
            />
           <Input
            name='tags'
            placeholder='tags'
            value={tags}
            onChange={onChangePost}
            className={classes.input}
            />
            <FileBase64
            type='file'
            value={image}
            onDone={({base64}) => setPostData({...postData, image: base64})}
            />

            <div>
            <Button 
            type='submit'
            style={{backgroundColor: 'rgb(77, 184, 255)', color: '#fff', width: '50%'}}
            variant='contained'
            >
              {curretnpostId ? (
                <span>
                  Edit Post
                </span>
              ) : (
                <span>
                Create a post
                </span>
              )}
           
            
            </Button>
            </div>
        </form>
        </Paper>
    </Container>
  )
}

export default Form