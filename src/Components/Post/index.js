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
            comments: [],
            commentList: []
        }

        this.componentDidMount = this.componentDidMount.bind(this)
        this.getComments = this.getComments.bind(this)
        this.updateComments = this.updateComments.bind(this)
        this.addComment = this.addComment.bind(this)
        this.removeComment = this.removeComment.bind(this)
        this.editComment = this.editComment.bind(this)
    }

    componentDidMount() {
        this.updateComments()
    }

    getComments() {
        return axios.get('http://localhost:8000/discussion')
    }

    async updateComments() {
        try {
            let comments = await this.getComments()
            this.setState(state => ({
                comments: comments.data
            }))

            function addChildren(id) {
                return comments.data.filter(item => !item.parent_id)
            }

            let newCommentsArray = comments.data.filter(item => !item.parent_id)

            comments.data.forEach((item) => {
                if (item.parent_id) {
                    const parent = newCommentsArray.find(elem => elem._id === item.parent_id)
                    parent.children = [...parent.children, item]
                }
            })

            this.setState(state => ({
                commentList: [...newCommentsArray]
            }))

        } catch (e) {
            alert(`can't load comments`)
        }
    }



    removeComment(id) {
        axios.delete(`http://localhost:8000/discussion/${id}`)
            .then((response) => {
                this.updateComments()
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
                this.updateComments()
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
                this.updateComments()
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
                <CommentsList comments={this.state.commentList}
                              removeComment={this.removeComment}
                              editComment={this.editComment}
                              replyToComment={this.addComment} />
            </div>
        );
    }
}

export default Post;
