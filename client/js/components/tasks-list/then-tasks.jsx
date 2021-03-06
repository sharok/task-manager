"use strict"

var React = require('react'),
    lz = require('localization').get(),
    tasksStore = require('stores/tasksStore'),
    taskActions = require('actions/taskActions'),
    mixins = require('mixins/main'),
    SvgIco = require('components/svg-ico.jsx'),
    dater = require('libs/dater');

var ThenTasks = React.createClass({
    mixins: mixins('bindToStore'),
    bindingStores: [tasksStore],

    getInitialState: function () {
        return {
            tasks: tasksStore.tasksForThen()
        }
    },

    _handlePostponeClick: function (taskId) {
        taskActions.postponeTask(taskId);
    },

    _handleArrowClick: function (taskId) {
        taskActions.forToday(taskId);
    },

    renderTask: function (task, index) {
        var dateFormat = task.timeWasSet ? 'Do MMMM HH:mm' : 'Do MMMM';

        return <li key={ index }>
            <i className="ico partial-star margin-right">
                <SvgIco name="partial-star" value={ task.precedence('%') } />
            </i>
            <i onClick={ this._handleArrowClick.bind(this, task._id) } className="ico pointer hovered margin-left margin-right-wide">
                <SvgIco name="up-arrow"/>
            </i>
            <i onClick={ this._handlePostponeClick.bind(this, task._id) } className="ico postpone pointer hovered">
                <SvgIco name="postpone"/>
            </i>
            <main className="inline-text">
                <strong>{task.title[0]}</strong>
                <span>{ task.title.substring(1, task.title.length) }</span> 
                <small> | {dater.format(dateFormat, task.date)}</small>
            </main>
        </li>;
    },

    render: function () {
        var tasksExist = this.state.tasks.length > 0;

        return (<div className="material-block">
            <section>
                <ul className="tasks">
                    <b>{ lz.THEN }</b>
                    { this.state.tasks.map(this.renderTask) }
                </ul>
            </section>
        </div>);
    }
});

module.exports = ThenTasks;