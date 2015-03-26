"use strict"

var React = require('react'),
    tasksStore = require('stores/tasksStore'),
    mixins = require('mixins/main');

var ThenTasks = React.createClass({
    mixins: mixins('bindToStore'),
    bindingStores: [tasksStore],

    getInitialState: function () {
        return {
            tasks: tasksStore.tasksForThen()
        }
    },

    renderTask: function (task) {
        return <li>{ task.title }</li>;
    },

    render: function () {
        return (<div className="material-block">
            <ul>
                { this.state.tasks.map(this.renderTask) }
            </ul>
        </div>);
    }
});

module.exports = ThenTasks;