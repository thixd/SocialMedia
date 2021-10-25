import React, { Component } from 'react';

export default class UserBar extends Component {
    render() {
        const { user } = this.props;
        if(!user) return null;
        return (
            // <div className="user">
            //     <img src={user.avatar} />
            //     <span>{user.username}</span>
            // </div>
            <div className="user">
                <img src="https://cdn-icons-png.flaticon.com/512/163/163811.png"/>
                <span>Katie</span>
            </div>
        );
    }
}