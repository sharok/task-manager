"use strict"

var React = require('react'),
    linkedList = require('linked-list'),
    quickAddActions = require('actions/quickTaskAddActions'),
    quickAddStore = require('stores/quickTaskAddStore'),
    QUICK_ADD_BLOCKS =  require('constants/quickTaskAddBlocks'),
    mixins = require('mixins/main'),
    keySwitch = require('key-switch'),
    lz = require('localization').get();

var TaskTextBox = React.createClass({
    mixins: mixins('bindToStore', 'dynamicStyle'),
    bindingStores: [quickAddStore],

    getInitialState: function () {
        return {
            active: quickAddStore.activeBlock() == QUICK_ADD_BLOCKS.TEXT_BOX,
            taskTitle: quickAddStore.title(),
            activeBlock: quickAddStore.activeBlock(),
            allowKeyCommand: quickAddStore.startedAdd()
        }
    },

    componentWillMount: function () {
        this.blocks = new linkedList(QUICK_ADD_BLOCKS.TEXT_BOX, QUICK_ADD_BLOCKS.SELECT_DATE, QUICK_ADD_BLOCKS.PRIORITY);
    },

    handleClick: function () {
        quickAddActions.changeAdditionBlock(QUICK_ADD_BLOCKS.TEXT_BOX);
        this.blocks.reset();
    },

    handleChange: function () {
        var title = this.refs.textBox.getDOMNode().value;

        if (title === '' && quickAddStore.startedAdd())
            quickAddActions.stopAddTask();

        if (title !== '' && !quickAddStore.startedAdd())
            quickAddActions.startAddTask();

        quickAddActions.setAdditionTaskTitle(title);
    },

    handleKeyDown: function (syntheticEvent) {
        if (!this.state.allowKeyCommand) {
            return;
        }

        var that = this;

        keySwitch(syntheticEvent.keyCode, {
            'enter': function () {
                quickAddActions.saveAdditionTask();
            },

            'esc': function () {
                quickAddActions.stopAddTask();
            },

            'tab': function () {
                syntheticEvent.preventDefault();
                quickAddActions.changeAdditionBlock(that.blocks.next(true));
            },

            'upArrow': function () {
                syntheticEvent.preventDefault();
                quickAddActions.changeAdditionBlock(that.blocks.prev());
            },

            'downArrow': function () {
                syntheticEvent.preventDefault();
                quickAddActions.changeAdditionBlock(that.blocks.next());
            },

            'leftArrow': function () {
                switch (that.state.activeBlock) {
                    case QUICK_ADD_BLOCKS.SELECT_DATE:
                        syntheticEvent.preventDefault();
                        quickAddActions.setAdditionTaskForToday();
                        break;
                    case QUICK_ADD_BLOCKS.PRIORITY:
                        syntheticEvent.preventDefault();
                        var newPriority = quickAddStore.priority() - 1;
                        quickAddActions.setAdditionTaskPriority(newPriority);
                        break;
                }
            },

            'rightArrow': function () {
                switch (that.state.activeBlock) {
                    case QUICK_ADD_BLOCKS.SELECT_DATE:
                        syntheticEvent.preventDefault();
                        quickAddActions.setAdditionTaskForDate();
                        break;
                    case QUICK_ADD_BLOCKS.PRIORITY:
                        syntheticEvent.preventDefault();
                        var newPriority = quickAddStore.priority() + 1;
                        quickAddActions.setAdditionTaskPriority(newPriority);
                        break;
                }
            }
        });
    },

    render: function () {
        return (<div className={ this.cs({ 'task-text-box': true, 'active': this.state.active }) }>
            <input ref="textBox"
                onChange={ this.handleChange }
                onKeyDown={ this.handleKeyDown }
                onClick={ this.handleClick }
                value={ this.state.taskTitle }
                type="text" placeholder={ lz.ADD_TASK } />
        </div>);
    }
});

module.exports = TaskTextBox;