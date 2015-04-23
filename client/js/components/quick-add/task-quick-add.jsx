"use strict"

var React = require('react'),
    mixins = require('mixins/main'),
    quickTaskAddStore = require('stores/quickTaskAddStore'),
    TaskTextBox = require('./task-text-box.jsx'),
    TaskSelectDate = require('./task-select-date.jsx'),
    TaskPriority = require('./task-priority.jsx'),
    TaskAddButton = require('./task-add-button.jsx');

var TaskQuickAdd = React.createClass({
    mixins: mixins('dynamicStyle', 'bindToStore'),
    bindingStores: [quickTaskAddStore],

    getInitialState: function () {
        return {
            displayExtra: quickTaskAddStore.startedAdd()
        }
    },
    
    render: function () {
        return (<div className="material-block">
            <div className="task-base-add">
                <TaskTextBox />
                <TaskSelectDate />
            </div>
            <div className={ this.cs({ 'task-extra-add': true, 'hidden': !this.state.displayExtra }) }>
                <TaskPriority />
                <TaskAddButton />
            </div>
        </div>);
    }
});

module.exports = TaskQuickAdd;