"use strict"

var React = require('react'),
    quickAddStore = require('stores/quickTaskAddStore'),
    bindToStore = require('mixins/bindToStore'),
    dynamicStyle = require('mixins/dynamicStyle'),
    Today = require('./today.jsx'),
    Then = require('./then.jsx');

var getSelectDateState = function () {
    return {
        display: quickAddStore.isAdding()
    }
};

var SelectDate = React.createClass({
    mixins: [bindToStore, dynamicStyle],

    getInitialState: function () {
        return getSelectDateState();
    },

    componentWillMount: function () {
        this.onStoreChange(quickAddStore, function (payload) {
            this.setState(getSelectDateState());
        }.bind(this));
    },

    render: function () {
        return (<div className={ this.cs({ 'select-date': true, 'hidden': !this.state.display }) }>
            <Today />
            <Then />
        </div>);
    }
});

module.exports = SelectDate;
