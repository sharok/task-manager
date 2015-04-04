"use strict"

var React = require('react'),
    lz = require('localization').get(),
    tasksStore = require('stores/tasksStore'),
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

    renderTask: function (task) {
        return <li>
            <i className="ico star margin-right">
                <SvgIco name="star" />
            </i>
            <i className="ico up-arrow margin-left margin-right-wide">
                <SvgIco name="up-arrow"/>
            </i>
            <i className="ico postpone">
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