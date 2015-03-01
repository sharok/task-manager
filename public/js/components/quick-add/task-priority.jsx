"use strict"

var React = require('react'),
    lz = require('localization').get(),
    mixins = require('mixins/main'),
    QUICK_ADD_BLOCKS = require('constants/quickTaskAddBlocks'),
    quickTaskAddStore = require('stores/quickTaskAddStore'),
    quickTaskAddActions = require('actions/quickTaskAddActions'),
    SvgIco = require('../svg-ico.jsx');

var TaskPriority = React.createClass({
    mixins: mixins('dynamicStyle', 'bindToStore'),
    bindingStores: [quickTaskAddStore],

    getInitialState: function () {
        return {
            active: quickTaskAddStore.activeBlock() == QUICK_ADD_BLOCKS.PRIORITY,
            priority: quickTaskAddStore.priority()
        }
    },

    handleStarClick: function (priority) {
        quickTaskAddActions.setAdditionTaskPriority(priority);
    },

    handleClick: function () {
        quickTaskAddActions.changeAdditionBlock(QUICK_ADD_BLOCKS.PRIORITY);
    },

    createStar: function (priority) {
        return (<i onClick={ this.handleStarClick.bind(this, priority) }  className={ this.cs({ 'ico margin-right': true, 'active': priority <= this.state.priority }) }>
            <SvgIco name="star" />
        </i>);
    },

    render: function () {
        var priorities = [1,2,3,4,5];

        return (<div onClick={ this.handleClick } className={ this.cs({ 'task-priority': true, 'active': this.state.active }) }>
            <strong>{ lz.PRIORITY }</strong>
            <section>
                { priorities.map(this.createStar) }
            </section>
        </div>);
    }
});

module.exports = TaskPriority;