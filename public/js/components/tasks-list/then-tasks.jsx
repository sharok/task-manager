"use strict"

var React = require('react'),
    lz = require('localization').get(),
    tasksStore = require('stores/tasksStore'),
    mixins = require('mixins/main'),
    SvgIco = require('../svg-ico.jsx'),
    dater = require('libs/dater');

var ThenTasks = React.createClass({
    mixins: mixins('bindToStore'),
    bindingStores: [tasksStore],

    getInitialState: function () {
        return {
            tasks: tasksStore.tasksForThen()
        }
    },

    renderTask: function (task) {
        return <li>
            <i className="star"><SvgIco name="star" /></i>
            <i className="up-arrow"> <SvgIco name="up-arrow"/></i>
            <span className="title">{task.title}</span>|<span className="date">{dater.format('Do MMMM', task.date, lz.NODATE)}</span>
            <i className="clock"><SvgIco name="clock"/></i>
            </li>;
    },

    render: function () {
        return (<div className="material-block then-tasks">
            <div>{lz.THEN}</div>
            <ul>
                { this.state.tasks.map(this.renderTask) }
            </ul>
        </div>);
    }
});

module.exports = ThenTasks;