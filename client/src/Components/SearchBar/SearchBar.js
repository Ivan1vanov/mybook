import { Button, Container, Input, Paper, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getPostsBySearchAction } from '../../redux/actions/postActios'

import useStyles from './searchbarStyles'

const SearchBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchData, setSearchData] = useState({
        text: '',
        tags: ''
    })

    const {text, tags} = searchData

    const onChangeSearchHandler = (e) => {
        setSearchData({
            ...searchData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitSearchHandler = (e) => {
        e.preventDefault()
        dispatch(getPostsBySearchAction({text: text, tags: tags}))
        navigate(`/posts/search?searchQuery=${text || 'none'}&tags=${tags}`)
    }

    const classes = useStyles()
  return (
    <Container>
        <form onSubmit={onSubmitSearchHandler}> 
            <Paper className={classes.paper}>
                <h1>Search</h1>
            <div className={classes.inputsContainer}>
                <TextField
                variant='outlined'
                label='Post'
                value={text}
                name='text'
                onChange={onChangeSearchHandler}
                />
                <TextField
                variant='outlined'
                label='Tags'
                value={tags}
                name='tags'
                onChange={onChangeSearchHandler}
                />
            </div>
            <div className={classes.buttonContainer}>
                <Button 
                type='submit'
                variant='outlined' 
                color='primary'
                style={{width: '50%'}}
                >Search</Button>
            </div>
            </Paper>
        </form>
    </Container>
  )
}

export default SearchBar