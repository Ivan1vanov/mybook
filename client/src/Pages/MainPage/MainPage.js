import { Button, Container, Grid, Paper } from '@material-ui/core'
import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Form from '../../Components/Form/Form'
import Paginate from '../../Components/Pgination/Paginate'
import Posts from '../../Components/Posts/Posts'
import SearchBar from '../../Components/SearchBar/SearchBar'
import useStyles from './mainPageStyles'

import CircularProgress from '@mui/material/CircularProgress';

import AddIcon from '@mui/icons-material/Add';
import { textAlign } from '@mui/system'

const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

const MainPage = () => {
    const classes = useStyles()
    const [curretnpostId, setCurrentPostId] = useState('')
    const {posts} = useSelector(state => state.posts)
    const query = useQuery()
    const page = query.get('page') || 1
    const user = JSON.parse(localStorage.getItem('profile'))

    const [createApost, setCreateApost] = useState(false)

    // console.log(curretnpostId)
  return (
    <Container className={classes.container}>
        <Grid container style={{flexDirection: 'column', maxWidth: '700px'}}>

            <Grid item>
            <SearchBar/>
            </Grid>
            {user?.token ? (
                <Fragment>
                <Button 
                color='primary' 
                variant='outlined' 
                style={{width: '50%', margin: '10px auto'}}
                onClick={() => setCreateApost(!createApost)}
                >
                Create a post <AddIcon/>
                </Button>
                {curretnpostId ? (
                <Grid item style={{
                    position: 'fixed',
                    zIndex: '999',
                    margin: '5% auto'
                }}>
                    <Paper style={{padding: '25px'}}>
                        <h2>Edit Post</h2>
                <Form curretnpostId={curretnpostId} setCurrentPostId={setCurrentPostId}/>
                <Button
                onClick={() => setCurrentPostId('')}
                >Cancel</Button>
                </Paper>
                </Grid>
            ) : createApost ? (
                <Fragment>
                     <Form curretnpostId={curretnpostId} setCurrentPostId={setCurrentPostId}/>
                </Fragment>
            ) : (
                <Fragment></Fragment>
            )}
                </Fragment>
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
                             Sign in to create a post, leave a comments and send a message to other users
                         </Paper>
                     </Grid>
                </Fragment>
            )}
           
           

            <Grid item>
            <div style={{display: 'flex', justifyContent: 'center'}}>
         <Paginate page={page} />
         </div>
            {posts ? (
                 <Fragment>
                 <Posts posts={posts} setCurrentPostId={setCurrentPostId}/>
         
             </Fragment>
            
            ): (
                <Fragment>
                <CircularProgress/>
            </Fragment>
            )}
            <div style={{display: 'flex', justifyContent: 'center'}}>
         <Paginate page={page} />
         </div>
            </Grid>
          
        </Grid>
       
    </Container>
  )
}

export default MainPage