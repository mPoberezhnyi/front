import React, { Component } from 'react'
import avatar from '../../img/user.jpeg'
import propTypes from 'prop-types'
import dayjs from "dayjs";

class AddComment extends Component {
    constructor() {
        super()
        this.state = {
            comment: ''
        }
        this.submit = this.submit.bind(this)
        this.changeComment = this.changeComment.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        this.setState(state => ({
            comment: this.props.item.comment
        }))
    }

    submit() {
        if (this.state.comment === '') {
            alert('Please enter your comment')
        }
        else {
            const comment = {
                user: "User Name",
                comment: this.state.comment,
                created_at: this.props.item.created_at || dayjs(new Date()).format('YYYY-MM-DD HH:mm'),
                updated_at: this.props.item.created_at ? dayjs(new Date()).format('YYYY-MM-DD HH:mm') : '',
                parent_id: this.props.item.parent_id || '0',
                type: 'positive',
                children: []
            }

            this.props.submitComment(comment);
            this.setState(state => ({
                comment: ''
            }));
        }
    }

    changeComment(e) {
        const comment = e.target.value
        this.setState(state => ({
            comment
        }));
    }

    render() {
        return (
            <div className="w-full mb-8 mt-8">
                <div className="w-full flex justify-start items-center mb-4">
                    <div className="rounded-full overflow-hidden mr-4">
                        <img src={avatar} alt="user name" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold">Your Name</p>
                    </div>
                </div>
                <div className="pl-16">
                    <textarea className="w-full text-base mb-4 resize-none h-40 w-full border border-gray-300 rounded-sm p-4 focus:outline-none"
                              placeholder="Enter your comment..."
                              defaultValue={this.state.comment}
                              onChange={this.changeComment}></textarea>
                </div>
                <div className="w-full flex justify-end">
                    <button onClick={this.submit}
                            className="py-2 px-4 bg-blue-500 font-bold text-white rounded-sm hover:bg-blue-700">
                        Submit
                    </button>
                </div>
            </div>
        );
    }
}

AddComment.propTypes = {
    item: propTypes.object,
    submitComment: propTypes.func
}

AddComment.defaultProps = {
    item: {
        user: "",
        comment: "",
        created_at: "",
        updated_at: "",
        parent_id: '0',
        type: 'positive',
        children: [],
    },
    submitComment: () => {}
}

export default AddComment;