"use strict"

var React = require('react');

var UpcomingTask = React.createClass({
    render: function () {
        return (<div className="upcoming-task">
            нет ближайших задач
        </div>);
    }
});

module.exports = UpcomingTask;