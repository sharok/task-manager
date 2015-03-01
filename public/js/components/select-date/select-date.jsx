"use strict"

var React = require('react'),
    quickAddStore = require('stores/quickTaskAddStore'),
    quickAddActions = require('actions/quickTaskAddActions'),
    QUICK_ADD_BLOCKS = require('constants/quickTaskAddBlocks'),
    mixins = require('mixins/main'),
    Today = require('./today.jsx'),
    Then = require('./then.jsx');

var SelectDate = React.createClass({
    mixins: mixins('dynamicStyle', 'bindToStore'),
    bindingStores: [quickAddStore],

    getInitialState: function () {
        return {
            display: quickAddStore.startedAdd(),
            active: quickAddStore.activeBlock() == QUICK_ADD_BLOCKS.SELECT_DATE
        }
    },

    handleClick: function () {
        quickAddActions.changeAdditionBlock(QUICK_ADD_BLOCKS.SELECT_DATE);
    },

    render: function () {
        return (<div ref="selectDate" onClick={ this.handleClick } className={ this.cs({ 'select-date': true, 'hidden': !this.state.display, 'active': this.state.active & this.state.display }) }>
            <Today />
            <Then />
        </div>);
    }
});

module.exports = SelectDate;
