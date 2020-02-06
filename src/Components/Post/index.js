import React, { Component } from 'react'
import CommentsList from '../CommentsList'
import img from '../../img/panorama-kyiv-3.jpg'

class Post extends Component {

    render() {
        return (
            <div className="container m-auto mb-16">
                <img src={img} className="w-full h-auto mt-8" alt="post name"/>
                <CommentsList />
            </div>
        );
    }
}

export default Post;
