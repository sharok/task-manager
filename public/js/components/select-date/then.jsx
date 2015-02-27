"use strict"

var React = require('react'),
    mixins = require('mixins/main'),
    quickTaskAddActions = require('actions/quickTaskAddActions'),
    quickTaskAddStore = require('stores/quickTaskAddStore'),
    lz = require('localization').get();

var Then = React.createClass({
    mixins: mixins('dynamicStyle', 'bindToStore'),
    bindingStores: [quickTaskAddStore],

    getInitialState: function () {
        return {
            active: !quickTaskAddStore.forToday()
        }
    },

    handleClick: function () {
        quickTaskAddActions.setAdditionTaskForDate();
    },

    render: function () {
        return (<div onClick={ this.handleClick } className={ this.cs({ 'select-date-variant': true, 'active': this.state.active }) }>
            { lz.THEN }
        </div>);
    }
});

module.exports = Then;