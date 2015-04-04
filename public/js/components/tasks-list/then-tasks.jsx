"use strict"

var React = require('react'),
    lz = require('localization').get(),
    tasksStore = require('stores/tasksStore'),
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
                <small> | {dater.format('Do MMMM', task.date)}</small>
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