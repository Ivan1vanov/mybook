import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsAction } from '../../redux/actions/postActios';
import Form from '../Form/Form';
import Post from './Post/Post';

const Posts = ({setCurrentPostId, posts}) => {

  return <div>
      {posts?.map(post => (
        <Fragment key={post._id}>
        <Post setCurrentPostId={setCurrentPostId} post={post}/>
        </Fragment>
      ))}
  </div>;
};

export default Posts;
