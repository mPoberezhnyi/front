import React, { Component } from 'react'
import Comment from "../Comment";
import propTypes from "prop-types";

class CommentsList extends Component {
    constructor() {
        super();

        this.removeComment = this.removeComment.bind(this)
        this.editComment = this.editComment.bind(this)
        this.replyToComment = this.replyToComment.bind(this)
    }

    removeComment(comment) {
        this.props.removeComment(comment)
    }

    editComment(comment, id) {
        this.props.editComment(comment, id)
    }

    replyToComment(comment) {
        this.props.replyToComment(comment)
    }

    sortByCreatedDate(array) {
        return array.sort((a, b) => a.created_at < b.created_at ? -1 : 1)
    }

    render() {
        const commentsList = this.sortByCreatedDate([...this.props.comments]).map((comment, key) => {

            return <Comment  key={key}
                             item={comment}
                             removeComment={this.removeComment}
                             editComment={this.editComment}
                             replyToComment={this.replyToComment} />
        })

        return (
            <div className="w-full">
                {commentsList}
            </div>
        );
    }
}

CommentsList.propTypes = {
    comments: propTypes.array,
    removeComment: propTypes.func,
    editComment: propTypes.func,
    replyToComment: propTypes.func
}

CommentsList.defaultProps = {
    comments: [],
    removeComment: () => {},
    editComment: () => {},
    replyToComment: () => {}
}

export default CommentsList;
