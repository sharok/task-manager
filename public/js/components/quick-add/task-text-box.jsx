"use strict"

var React = require('react'),
    quickAddActions = require('actions/quickTaskAddActions'),
    lz = require('localization').get();

var TaskTextBox = React.createClass({
    _handleKeyDown: function (syntheticEvent) {
        var textBoxNode = this.refs.textBox.getDOMNode();

        if (syntheticEvent.keyCode == 27) {
            textBoxNode.value = '';
            quickAddActions.leaveAddingTask();
            return;
        }

        if (textBoxNode.value.trim() !== '') {
            quickAddActions.addingTask();
        } else {
            quickAddActions.leaveAddingTask();
        }
    },

    render: function () {
        return <input ref="textBox" onKeyUp={ this._handleKeyDown } className="task-text-box" type="text" placeholder={ lz.ADD_TASK } />;
    }
});

module.exports = TaskTextBox;