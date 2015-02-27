"use strict"

var React = require('react'),
    quickAddActions = require('actions/quickTaskAddActions'),
    quickAddStore = require('stores/quickTaskAddStore'),
    keySwitch = require('key-switch'),
    lz = require('localization').get();

var TaskTextBox = React.createClass({
    componentWillMount: function () {
        this.currentArrowAction = 'date'
    },

    handleKeyDown: function (syntheticEvent) {
        var textBoxNode = this.refs.textBox.getDOMNode(),
        that = this;

        keySwitch(syntheticEvent.keyCode, {
            'esc': function () {
                textBoxNode.value = '';
                quickAddActions.stopAddTask();
            },

            'upArrow': function () {
                that.currentArrowAction = 'date';
            },

            'downArrow': function () {
                that.currentArrowAction = 'priority';
            },

            'leftArrow': function () {
                switch (that.currentArrowAction) {
                    case 'date':
                        quickAddActions.setAdditionTaskForToday();
                        break;
                    case 'priority':
                        var newPriority = quickAddStore.priority() - 1;
                        quickAddActions.setAdditionTaskPriority(newPriority);
                        break;
                }
            },

            'rightArrow': function () {
                switch (that.currentArrowAction) {
                    case 'date':
                        quickAddActions.setAdditionTaskForDate();
                        break;
                    case 'priority':
                        var newPriority = quickAddStore.priority() + 1;
                        quickAddActions.setAdditionTaskPriority(newPriority);
                        break;
                }
            },

            'other': function () {
                if (textBoxNode.value.trim() !== '')
                    quickAddActions.startAddTask();
                else
                    quickAddActions.stopAddTask();
            }
        });
    },

    render: function () {
        return <input ref="textBox" onKeyUp={ this.handleKeyDown } className="task-text-box" type="text" placeholder={ lz.ADD_TASK } />;
    }
});

module.exports = TaskTextBox;