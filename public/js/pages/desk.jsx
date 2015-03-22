"use strict"

var React = require('react'),
    TaskQuickAdd = require('components/quick-add/task-quick-add.jsx'),
    TodayTasks = require('components/tasks-list/today-tasks');

var Main = React.createClass({
    render: function () {
        return (<div>
            <div className="content-section">
                <TaskQuickAdd />
            </div>
            <div className="content-section">
            </div>
        </div>);
    }
});

module.exports = Main;