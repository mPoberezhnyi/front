import React, { Component } from 'react'
import avatar from '../../img/user.jpeg'
import propTypes from 'prop-types'
import edit from '../../img/icons/edit.svg'
import remove from '../../img/icons/delete.svg'
import AddComment from "../AddComment"

class Comment extends Component {
    constructor() {
        super()
        this.state = {
            isReplyToComment: false,
            isEditComment: false
        }

        this.remove = this.remove.bind(this)
        this.replyToComment = this.replyToComment.bind(this)
        this.switchEditComment = this.switchEditComment.bind(this)
        this.editComment = this.editComment.bind(this)
        this.submitNewComment = this.submitNewComment.bind(this)
    }

    remove() {
        this.props.removeComment(this.props.item._id)
    }

    replyToComment() {
        this.setState(state => ({
            isReplyToComment: !this.state.isReplyToComment
        }))
    }

    switchEditComment() {
        this.setState(state => ({
            isEditComment: !this.state.isEditComment
        }))
    }

    editComment(comment) {
        this.props.editComment(comment, this.props.item._id)
        this.switchEditComment()
    }

    submitNewComment(comment) {
        this.props.replyToComment(comment)
        this.replyToComment()
    }

    render() {

        const updatedAt = this.props.item.updated_at ? <span className="text-xs text-gray-700 mr-4">Updated at {this.props.item.updated_at}</span> : <span></span>

        const addNewComment = this.state.isReplyToComment ? <div className="pl-16">
            <AddComment item={{_id: this.props.item._id}}
                        submitComment={this.submitNewComment}/>
        </div> : ''

        const replyButton = !this.state.isReplyToComment ? <p className="text-base text-blue-500 cursor-pointer" onClick={this.replyToComment}>reply</p> : ''

        const commentForm = <div>
            <div className="w-full flex justify-between items-center mb-4">
                <div className="flex justify-center items-center">
                    <div className="rounded-full overflow-hidden mr-4">
                        <img src={avatar} alt="user name" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">{this.props.item.user}</p>
                        <p className="text-xs text-gray-700">{this.props.item.created_at}</p>
                    </div>
                </div>
                <div>
                    <div className="w-full flex justify-start items-center mb-4">
                        {updatedAt}
                        <span className="text-base text-blue-500 cursor-pointer">
                                <img src={edit}
                                     className="w-6 mr-4"
                                     onClick={this.switchEditComment}
                                     alt="edit icon" />
                            </span>
                        <span className="text-base text-blue-500 cursor-pointer"
                              onClick={this.remove}>
                                <img src={remove}
                                     className="w-6"
                                     alt="remove icon" />
                            </span>
                    </div>
                </div>
            </div>
            <div className="w-full text-base mb-4">
                {this.props.item.comment}
            </div>
            <div className="w-full flex justify-start items-center">
                {replyButton}
            </div>
            {addNewComment}
        </div>

        const editCommentForm = <div>
            <AddComment item={this.props.item}
                        submitComment={this.editComment}/>
        </div>

        const comment = this.state.isEditComment ? editCommentForm : commentForm

        return (
            <div className="w-full mb-12">
                {comment}
            </div>
        );
    }
}

Comment.propTypes = {
    item: propTypes.object,
    removeComment: propTypes.func,
    editComment: propTypes.func,
    replyToComment: propTypes.func
}

Comment.defaultProps = {
    item: {
        _id: Symbol(),
        user: "",
        comment: "",
        created_at: "",
        updated_at: "",
        parrent_id: "3",
        type: 'positive',
        children: [],
    },
    removeComment: () => {},
    editComment: () => {},
    replyToComment: () => {}
}

export default Comment;