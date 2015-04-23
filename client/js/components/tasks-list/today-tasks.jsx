"use strict"

var React = require('react'),
    lz = require('localization').get(),
    tasksStore = require('stores/tasksStore'),
    taskActions = require('actions/taskActions'),
    mixins = require('mixins/main'),
    SvgIco = require('components/svg-ico.jsx');

var TodayTasks = React.createClass({
    mixins: mixins('bindToStore', 'dynamicStyle'),
    bindingStores: [tasksStore],
    
    getInitialState: function () {
        return {
            tasks: tasksStore.tasksForToday()
        }
    },

    _handleCheckClick: function (taskId) {
        var task = tasksStore.get(taskId);

        if (task.done) {
            taskActions.makeActive(taskId);
        } else {
            taskActions.markAsDone(taskId);
        }          
    },

    _handlePostponeClick: function (taskId) {
        taskActions.postponeTask(taskId);
    },

    renderTask: function (task, index) {
        return <li key={ index } className={ this.cs({ 'done': task.done }) }>
            <i className="ico partial-star margin-right">
                <SvgIco name="partial-star" value={ task.precedence('%') } />
            </i>
            <i onClick={ this._handleCheckClick.bind(this, task._id) } 
                className="ico check pointer margin-left margin-right-wide">
                <div className="uncheck-box"></div>
                <div className="check-circle"></div>
                <SvgIco name="check"/>
            </i>
            <i onClick={ this._handlePostponeClick.bind(this, task._id) } className="ico postpone pointer hovered">
                <SvgIco name="postpone"/>
            </i>
            <main className="inline-text">
                <strong>{task.title[0]}</strong>
                <span>{ task.title.substring(1, task.title.length) }</span>
            </main>
        </li>;
    },

    render: function () {
        return (<div className="material-block">
            <section >
                <ul className="tasks">
                    <b>{ lz.TODAY }</b>
                    { this.state.tasks.map(this.renderTask) }
                </ul>
            </section>
        </div>);
    }
});

module.exports = TodayTasks;