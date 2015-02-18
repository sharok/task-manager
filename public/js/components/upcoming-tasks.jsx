"use strict"

var React = require('react');

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
            <h4>Ближайшие задачи</h4>
            {[
                { time: '13:30', title: 'Лекция по алгоритмам' },
                { time: '18:30', title: 'Speaking club' }
            ].map(this.renderUpcomingTask)}
        </div>);
    }
});

module.exports = UpcomingTask;