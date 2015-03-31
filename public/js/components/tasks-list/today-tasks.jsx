"use strict"

var React = require('react'),
    lz = require('localization').get(),
    tasksStore = require('stores/tasksStore'),
    mixins = require('mixins/main'),
    SvgIco = require('../svg-ico.jsx');

var TodayTasks = React.createClass({
    mixins: mixins('bindToStore'),
    bindingStores: [tasksStore],
    
    getInitialState: function () {
        return {
            tasks: tasksStore.tasksForToday()
        }
    },

    renderTask: function (task) {
        return <li>
            <i className="star"><SvgIco name="star" /></i>
            <i className="check"><SvgIco name="check"/></i>
            {task.title }
            <i className="clock"><SvgIco name="clock"/></i>
        </li>;
    },

    render: function () {
        return (<div className="material-block today-tasks">
            <div>{lz.TODAY}</div>
            <ul>
                 { this.state.tasks.map(this.renderTask) }
            </ul>
        </div>);
    }
});

module.exports = TodayTasks;