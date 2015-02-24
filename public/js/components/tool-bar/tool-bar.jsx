"use strict"

var React = require('react'),
    Notifications = require('./notifications.jsx'),
    IncomingFriends = require('./incoming-friends.jsx'),
    IncomingTasks = require('./incoming-tasks.jsx');

var ToolBar = React.createClass({
    render: function () {
        return (<div className="tool-bar">
            <Notifications />
            <IncomingFriends />
            <IncomingTasks />
        </div>);
    }
});

module.exports = ToolBar;
