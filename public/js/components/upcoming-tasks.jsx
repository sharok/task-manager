"use strict"

var React = require('react'),
    lz = require('localization').get();

var UpcomingTask = React.createClass({
    renderUpcomingTask: function (task) {
        return (
            <section>
                <strong>{ task.time }</strong>
                <small>{ task.title }</small>
            </section>
        );
    },

    render: function () {
        return (<div className="upcoming-tasks">
            <h4>{ lz.UPCOMING_TASKS }</h4>
            {[
                { time: '13:30', title: 'Algorithm lecture' },
                { time: '18:30', title: 'Speaking club' }
            ].map(this.renderUpcomingTask)}
        </div>);
    }
});

module.exports = UpcomingTask;