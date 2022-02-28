import React, { useEffect } from 'react'
import {Pagination, PaginationItem} from '@material-ui/lab'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPostsAction, getPostsOfCurrentUserAction } from '../../redux/actions/postActios'

const PaginateUserPage = ({page, creatorId}) => {
    const dispatch = useDispatch()
    

    const {numberOfPages} = useSelector(state => state.posts)
    useEffect(() => {
            dispatch(getPostsOfCurrentUserAction(creatorId, page))
    }, [page, creatorId])

  return ( 
    <div>
        <Pagination
        count={numberOfPages}
        page={Number(page) || 1}
        color='primary'
        variant='outlined'
        renderItem={(item) => (
            <PaginationItem {...item} component={Link} to={`/user/${creatorId}?page=${item.page}`}/>
        )}
        />
    </div>
  )
}

export default PaginateUserPage