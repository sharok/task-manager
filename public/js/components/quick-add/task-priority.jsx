"use strict"

var React = require('react'),
    lz = require('localization').get(),
    mixins = require('mixins/main'),
    quickTaskAddStore = require('stores/quickTaskAddStore'),
    quickTaskAddActions = require('actions/quickTaskAddActions'),
    SvgIco = require('../svg-ico.jsx');

var TaskPriority = React.createClass({
    mixins: mixins('dynamicStyle', 'bindToStore'),
    bindingStores: [quickTaskAddStore],

    getInitialState: function () {
        return {
            priority: quickTaskAddStore.priority()
        }
    },

    handleStarClick: function (priority) {
        quickTaskAddActions.setAdditionTaskPriority(priority);
    },

    createStar: function (priority) {
        return (<i onClick={ this.handleStarClick.bind(this, priority) }  className={ this.cs({ 'active': priority <= this.state.priority }) }>
            <SvgIco name="star" />
        </i>);
    },

    render: function () {
        var priorities = [1,2,3,4,5];

        return (<div className="task-priority">
            <strong>{ lz.PRIORITY }</strong>
            <section>
                { priorities.map(this.createStar) }
            </section>
        </div>);
    }
});

module.exports = TaskPriority;