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
            commentsList: []
        }

        this.componentDidMount = this.componentDidMount.bind(this)
        this.getComments = this.getComments.bind(this)
        this.updateComments = this.updateComments.bind(this)
        this.addComment = this.addComment.bind(this)
        this.removeComment = this.removeComment.bind(this)
        this.editComment = this.editComment.bind(this)
        this.getChildren = this.getChildren.bind(this)
        this.writeChildren = this.writeChildren.bind(this)
        this.removeChildren = this.removeChildren.bind(this)
    }

    async componentDidMount() {
        await this.updateComments()
    }

    getComments() {
        return axios.get('https://77.120.108.21:8000/discussion')
    }

    getChildren(id) {
        return this.state.comments.filter(item => item.parent_id === id)
    }

    writeChildren(comments) {
        comments.forEach(item => {
            item.children = this.getChildren(item._id)
            if (item.children.length > 0) {
                this.writeChildren(item.children)
            }
        })
    }

    async updateComments() {
        try {
            const comments = await this.getComments()
            await this.setState(state => ({
                comments: comments.data
            }))
            let newComments = this.getChildren('0')
            this.writeChildren(newComments)
            this.setState(state => ({
                commentsList: newComments
            }))
        } catch (e) {
            alert(`can't get comment`)
        }
    }
    
    removeChildren(comments) {
        comments.forEach(item => {
            if (item.children) this.removeChildren(item.children)

            axios.delete(`https://77.120.108.21:8000/discussion/${item._id}`)
                .then(async (response) => {
                    await this.updateComments()
                })
                .catch ((e) => {
                    alert(`can't delete comment`)
                })
        })
    }

    removeComment(item) {
        if (item.children) this.removeChildren(item.children)

        axios.delete(`https://77.120.108.21:8000/discussion/${item._id}`)
            .then(async (response) => {
                await this.updateComments()
            })
            .catch ((e) => {
                alert(`can't delete comment`)
            })
    }

    addComment(comment) {
        axios.post('https://77.120.108.21:8000/discussion', formurlencoded(comment), {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }})
            .then(async (responce) => {
                await this.updateComments()
            })
            .catch((e) => {
                console.warn(e)
            })
    }

    editComment(comment, id) {
        axios.put(`https://77.120.108.21:8000/discussion/${id}`, formurlencoded(comment), {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }})
            .then(async (responce) => {
                await this.updateComments()
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
                <CommentsList comments={this.state.commentsList}
                              removeComment={this.removeComment}
                              editComment={this.editComment}
                              replyToComment={this.addComment} />
            </div>
        );
    }
}

export default Post;
