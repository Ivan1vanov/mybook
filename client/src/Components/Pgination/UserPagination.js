import React, { useEffect } from 'react'
import {Pagination, PaginationItem} from '@material-ui/lab'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPostsAction, getPostsOfCurrentUserAction } from '../../redux/actions/postActios'

const UserPagination = ({page, creatorId}) => {
    const dispatch = useDispatch()
    

    // const {numberOfPages} = useSelector(state => state.posts)

  return ( 
    <div>
        <Pagination
        count={1}
        page={1}
        color='primary'
        variant='outlined'
        renderItem={(item) => (
            <PaginationItem {...item} component={Link} to={`/user/${creatorId}?page=${item.page}`}/>
        )}
        />
    </div>
  )
}

export default UserPagination