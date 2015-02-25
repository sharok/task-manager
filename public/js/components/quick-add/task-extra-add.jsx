"use strict"

var React = require('react'),
    quickAddStore = require('stores/quickTaskAddStore'),
    bindToStore = require('mixins/bindToStore'),
    dynamicStyle = require('mixins/dynamicStyle'),
    TaskPriority = require('./task-priority.jsx');

var getTaskExtraAddState = function () {
    return {
        display: quickAddStore.isAdding()
    }
};

var TaskExtraAdd = React.createClass({
    mixins: [bindToStore, dynamicStyle],

    getInitialState: function () {
        return getTaskExtraAddState();
    },

    componentWillMount: function () {
        this.onStoreChange(quickAddStore, function () {
            this.setState(getTaskExtraAddState());
        }.bind(this));
    },

    render: function () {
        return (<div className={ this.cs({ 'task-extra-add': true, 'hidden': !this.state.display }) }>
            <TaskPriority/>
        </div>);
    }
});

module.exports = TaskExtraAdd;