"use strict"

var React = require('react'),
    TaskQuickAdd = require('components/quick-add/task-quick-add'),
    TodayTasks = require('components/tasks-list/today-tasks'),
    ThenTasks = require('components/tasks-list/then-tasks'),
    taskActions = require('actions/taskActions');

var Main = React.createClass({
    componentWillMount: function() {
        taskActions.receiveTasks();
    },
    
    render: function () {
        return (<div>
            <div className="content-section padding-top-high">
                <TaskQuickAdd />
            </div>
            <div className="content-section padding-top-none padding-bottom-none">
                <TodayTasks />
            </div>
            <div className="content-section padding-top-mini">
                <ThenTasks />
            </div>
        </div>);
    }
});

module.exports = Main;