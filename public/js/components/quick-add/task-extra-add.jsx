"use strict"

var React = require('react'),
    quickAddStore = require('stores/quickTaskAddStore'),
    mixins = require('mixins/main'),
    TaskPriority = require('./task-priority.jsx'),
    TaskAddButton = require('./task-add-button.jsx');

var TaskExtraAdd = React.createClass({
    mixins: mixins('bindToStore', 'dynamicStyle'),
    bindingStores: [quickAddStore],

    getInitialState: function () {
        return {
            display: quickAddStore.startedAdd()
        };
    },

    render: function () {
        return (<div className={ this.cs({ 'task-extra-add': true, 'hidden': !this.state.display }) }>
            <TaskPriority/>
            <TaskAddButton />
        </div>);
    }
});

module.exports = TaskExtraAdd;