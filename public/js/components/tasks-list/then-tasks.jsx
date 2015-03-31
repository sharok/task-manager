"use strict"

var React = require('react'),
    tasksStore = require('stores/tasksStore'),
    mixins = require('mixins/main');

var ThenTasks = React.createClass({
    mixins: mixins('bindToStore', 'test'),
    bindingStores: [tasksStore],

    getInitialState: function () {
        return {
            tasks: tasksStore.tasksForThen()
        }
    },

    renderTask: function (task) {
        return <li>{ task.title }</li>;
    },

    componentDidMount: function () {
      this.showMessage("Hello world!");
    },

    render: function () {
        return (<div className="material-block then-tasks">
            <div>Then</div>
            <ul>
                { this.state.tasks.map(this.renderTask) }
            </ul>
        </div>);
    }
});

module.exports = ThenTasks;