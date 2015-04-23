"use strict"

var React = require('react'),
    dater = require('libs/dater'),
    tasksStore = require('stores/tasksStore'),
    mixins = require('mixins/main'),
    lz = require('localization').get();

var UpcomingTask = React.createClass({
    mixins: mixins('bindToStore'),
    bindingStores: [tasksStore],

    getInitialState: function () {
        var begin = new Date(),
            end = new Date();
        end.setHours(end.getHours() + 2);

        return {
            tasks: tasksStore.get({ timeWasSet: true, done: false }).filter(function (task) {
                return task.date <= end && task.date >= begin;
            }).sort(function (a, b) {
                if (a.date > b.date) return 1;
                if (a.date < b.date) return -1;
                return 0;
            })
        };
    },

    renderUpcomingTask: function (task, index) {
        return (
            <section key={ index }>
                <strong>{ dater.format('HH:mm', task.date) }</strong>
                <small>{ task.title }</small>
            </section>
        );
    },

    render: function () {
        return (<div className="upcoming-tasks">
            <h4>{ this.state.tasks.length == 0 ? lz.NO_UPCOMING_TASK : lz.UPCOMING_TASKS }</h4>
            { this.state.tasks.map(this.renderUpcomingTask) }
        </div>);
    }
});

module.exports = UpcomingTask;