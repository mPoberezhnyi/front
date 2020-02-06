import React, { Component } from 'react'
import Comment from "../Comment";
import axios from 'axios'
import AddComment from "../AddComment"
import formurlencoded from "form-urlencoded";

class CommentsList extends Component {
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
        console.log('get comments')
        axios.get('http://localhost:8000/discussion')
            .then((response) => {
                this.setState(state => ({
                    comments: response.data
                }))
            })
            .catch ((e) => {
                alert(`can't load comments`)
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
                this.getComments()
            })
            .catch((e) => {
                console.warn(e)
            })
    }
    
    editComment(comment, id) {
        axios.put(`http://localhost:8000/discussion/${id}`, formurlencoded(comment), {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }})
            .then((responce) => {
                console.log(responce)
                this.getComments()
            })
            .catch((e) => {
                console.warn(e)
            })
    }

    render() {
        const commentsList = this.state.comments.map((comment, key) => {
            return <Comment  key={key}
                             item={comment}
                             removeItem={this.removeComment}
                             submitEditedComment={this.editComment}
                             replyToComment={this.addComment} />
        })

        return (
            <div className="w-full">
                <AddComment submitComment={this.addComment} />
                {commentsList}
            </div>
        );
    }
}

export default CommentsList;
