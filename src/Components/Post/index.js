import React, { Component } from 'react'
import CommentsList from '../CommentsList'
import img from '../../img/panorama-kyiv-3.jpg'
import axios from 'axios'
import AddComment from "../AddComment";
import formurlencoded from "form-urlencoded";

class Post extends Component {
    constructor() {
        super();
        this.state = {
            comments: []
        }

        this.componentDidMount = this.componentDidMount.bind(this)
        this.getComments = this.getComments.bind(this)
        this.addComment = this.addComment.bind(this)
        this.removeComment = this.removeComment.bind(this)
        this.editComment = this.editComment.bind(this)
    }

    componentDidMount() {
        this.getComments()
    }

    getComments() {
        axios.get('http://localhost:8000/discussion')
            .then((response) => {
                this.setState(state => ({
                    comments: response.data
                }))
            })
            .catch ((e) => {
                alert(`can't delete comment`)
            })
    }

    removeComment(id) {
        axios.delete(`http://localhost:8000/discussion/${id}`)
            .then((response) => {
                this.getComments()
            })
            .catch ((e) => {
                alert(`can't delete comment`)
            })
    }

    addComment(comment) {
        axios.post('http://localhost:8000/discussion', formurlencoded(comment), {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }})
            .then((responce) => {
                if (comment.parent_id) {
                    this.addChildrenComment(comment.parent_id, responce.data._id)
                }
                this.getComments()
            })
            .catch((e) => {
                console.warn(e)
            })
    }

    addChildrenComment(id, child_id) {
        let { user, comment, created_at, updated_at, parent_id, type, children} = this.state.comments.find(item => item._id === id)

        this.editComment({
            user,
            comment,
            created_at,
            updated_at,
            parent_id,
            type,
            children: [...children, child_id]
        }, id)
    }

    editComment(comment, id) {
        axios.put(`http://localhost:8000/discussion/${id}`, formurlencoded(comment), {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }})
            .then((responce) => {
                this.getComments()
            })
            .catch((e) => {
                console.warn(e)
            })
    }

    render() {
        return (
            <div className="container m-auto mb-16">
                <img src={img} className="w-full h-auto mt-8" alt="post name"/>
                <AddComment submitComment={this.addComment} />
                <CommentsList comments={this.state.comments}
                              removeComment={this.removeComment}
                              editComment={this.editComment}
                              replyToComment={this.addComment} />
            </div>
        );
    }
}

export default Post;
