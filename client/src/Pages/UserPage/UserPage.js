import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { getCurretuserAction, uploadAvatarAction } from '../../redux/actions/userActions'
import './userPage.css'
import useStyles from './usePageStyles.js'
import { Button, Container, Grid, Input, Paper } from '@material-ui/core'
import { getPostsOfCurrentUserAction } from '../../redux/actions/postActios'
import Posts from '../../Components/Posts/Posts'
import MainPage from '../MainPage/MainPage'
import Paginate from '../../Components/Pgination/Paginate'
import PaginateUserPage from '../../Components/Pgination/PaginateUserPage'

import FileBase64 from 'react-file-base64'

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}


const UserPage = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const query = useQuery()
    const page = query.get('page') || 1
    const currentUser = JSON.parse(localStorage.getItem('profile'))
    // console.log(id)
 
    const [isChangeAvatar, setIsChangeAvatar] = useState(false)
    const [userMainPhoto, setUserMainPhtotr] = useState({
      userAvatar: ''
    })


    const {posts} = useSelector(state => state.posts)

    // console.log(posts)
    const {user} = useSelector(state => state.user)
    useEffect(() => {
        dispatch(getCurretuserAction(id))
    }, [id, dispatch])

    useEffect(() => {
        dispatch(getPostsOfCurrentUserAction(id))
    }, [])
    // console.log(isChangeAvatar)
    const [isShowInformation, setIsShowInformation] = useState(false)

    const changeAvatar = (e) => {
      dispatch(uploadAvatarAction(id, userMainPhoto))
      setIsChangeAvatar(false)
    }

    const classes = useStyles()
  return (
    <div>
        <div className={classes.profile}>
        <div className={classes.profileRight}>
          <div className={classes.profileRightTop}>
            <div className={classes.profileCover}>
              <img
                className={classes.profileCoverImg}
                src={'https://ak.picdn.net/shutterstock/videos/1011150074/thumb/1.jpg?ip=x480'}
                alt=""
              />
              <img
                className={classes.profileUserImg}
                src={userMainPhoto.userAvatar || user?.avatar || 
                  'https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png'
                }
                alt=""
              />
            </div>
       
              <Paper className={isChangeAvatar ? 'changeForm' : 'hideAvatarForm'}>
            <FileBase64
            type='file'
            value={userMainPhoto}
            onDone={({base64}) => setUserMainPhtotr({...userMainPhoto, userAvatar: base64})}
            />
            <Button 
            style={{margin: '10px'}}
            color='primary'
            variant='outlined'
            onClick={changeAvatar}>
              Save
            </Button>
            </Paper>

            <Container style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            {user?._id === currentUser?.result?._id && (
              <Button
              style={{width: '400px', margin: '0 auto'}}
              color='primary'
              variant='outlined'
              onClick={() => setIsChangeAvatar(!isChangeAvatar)}
            >Change avatar</Button>
            )}
          </Container>
            <div className={classes.profileInfo}>
              <h4 className={classes.profileInfoName}>{user?.name}</h4>
              <span className={classes.profileInfoDesc}>User Info</span>
            </div>
          </div>
          <div className={classes.profileRightBottom}>
          </div>
        </div>
      </div>
      <Container style={{display: 'flex', flexDirection: 'column'}}>
     
          <Button
          style={{width: '400px', margin: '0 auto'}}
          color='primary'
          variant='contained'
          onClick={() => setIsShowInformation(!isShowInformation)}
          >info</Button>

          {/* I use css styles decause I need an animation which is no in fvking jsStyles */}
          {isShowInformation ? (
            <Fragment>
      <Grid container 
      className={isShowInformation ? 'shoInfo' : 'hidenInfo'} 
      >

          <Grid item className={classes.paperUserInfo}>
            <Paper style={{padding: '10px'}}>
                <div className={classes.infoItem}>Birthday: </div>
                <div className={classes.infoItem}>City: </div>
                <div className={classes.infoItem}>Country: </div>
                <div className={classes.infoItem}>Language: </div>

            </Paper>
            
          </Grid>

          <Grid item className={classes.paperUserInfo}>
            <Paper style={{padding: '10px', minHeight: '135px'}}>
                 <div className={classes.infoItem}>Author about: </div> <br/>
            </Paper>   
          </Grid>

          <Grid item className={classes.paperUserInfo}>
            <Paper style={{padding: '10px', minHeight: '135px'}}>
            <div className={classes.infoItem}>School: </div>
            <div className={classes.infoItem}>University: </div>
            <div className={classes.infoItem}>Colege: </div>
            </Paper>
             
          </Grid>
          <Paper style={{maxWidth: '700px', minWidth: '500px'}}> 
          <div style={{textAlign: 'center'}}>
          <h1>Posts </h1>
          </div>
        
          {posts?.length > 0 ? (
            <Fragment>
              <Posts posts={posts}/>
              <PaginateUserPage creatorId={id} page={page}/>
            </Fragment>
          ) : (
            <Fragment>
              No posts yet
            </Fragment>
          )}
      </Paper>
     
      </Grid>
            </Fragment>
          ) : (
            <Fragment>

            </Fragment>
          )}
     
     
      </Container>

      
    </div>
  )
}

export default UserPage