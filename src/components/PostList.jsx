import React from "react";
import { Fragment } from "react";
import  PropTypes from "prop-types";
import {Post} from './Post.jsx'
import '../index.css'

export function PostList({posts = []}){
  return (
    <section>
      <div className='flex flex-col place-content-around'>
        {posts.map((post) => (
          <Fragment key={post._id}>
            <Post {...post} />
            <hr />
          </Fragment>
        ))}
      </div>
    </section>
  )
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)).isRequired,
}



