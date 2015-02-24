"use strict"

var React = require('react'),
    TaskAddBox = require('./task-add-box.jsx'),
    TaskExtraAdd = require('./task-extra-add.jsx');

var TaskQuickAdd = React.createClass({
    render: function () {
        return (<div className="task-quick-add">
            <TaskAddBox />
            <TaskExtraAdd />
        </div>);
    }
});

module.exports = TaskQuickAdd;