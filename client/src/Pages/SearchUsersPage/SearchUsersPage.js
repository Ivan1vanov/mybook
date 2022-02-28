import { Button, Container, Paper, TextField } from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PaginateUserPage from '../../Components/Pgination/PaginateUserPage'
import UserPagination from '../../Components/Pgination/UserPagination'
import { getAllUsersAction, searchUsersAction } from '../../redux/actions/userActions'
import UserIcon from './UserIcon'

const SearchUsersPage = () => {
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('')

  const {users} = useSelector(state => state.user)
  // console.log(users)

  useEffect(() => {
    dispatch(getAllUsersAction())
  }, [])

  const onSearchUsersHandler = (e) => {
    e.preventDefault()
      dispatch(searchUsersAction(userName))
  }

  return (
    <Container style={{display: 'flex', justifyContent: 'center'}}>

        <div style={{width: '90%'}}>
        <form style={{display: 'flex', justifyContent: 'center'}} onSubmit={onSearchUsersHandler}>
          <TextField
          color='primary'
          variant='outlined'
          value={userName}
          onChange={e => setUserName(e.target.value)}
          />
          <Button
          color='primary'
          variant='outlined'
          type='submit'
          >Search</Button>
        </form>
          {users?.map(user => (
            <div key={user._id}>
              <UserIcon user={user} />
            </div>
          ))}
           <div>
          <UserPagination/>
        </div>
        </div>
       

    </Container>
  )
}

export default SearchUsersPage