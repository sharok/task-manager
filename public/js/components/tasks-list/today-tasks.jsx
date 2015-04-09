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

    renderTask: function (task, index) {
        return <li key={ index }>
            <i className="ico partial-star margin-right">
                <SvgIco name="partial-star" value={ task.precedence('%') } />
            </i>
            <i className="ico pointer hovered margin-left margin-right-wide">
                <SvgIco name="check"/>
            </i>
            <i className="ico postpone pointer hovered">
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