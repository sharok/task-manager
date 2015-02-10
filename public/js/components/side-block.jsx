"use strict"

var React = require('react'),
    Navigation = require('./navigation.jsx'),
    Clock = require('./clock.jsx'),
    TaskProgress = require('./task-progress.jsx'),
    UpcomingTask = require('./upcoming-task.jsx');

module.exports = React.createClass({
    render: function () {
        var tasks = [
            { title: 'Поступление в ВУЗ', complete: 24 },
            { title: 'Изучение английского', complete: 58 }
        ];

        return (<div className="side-block">

            <div className="section tablet tall">
                <Clock />
                <UpcomingTask />
            </div>

            <div className="section tablet">
                <TaskProgress item={ tasks[0] } />
            </div>

            <div className="section tablet">
                <TaskProgress item={ tasks[1] } />
            </div>

            <div className="section">
                <Navigation />
            </div>
        </div>);
    }
});