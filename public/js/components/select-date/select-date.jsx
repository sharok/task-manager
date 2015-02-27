"use strict"

var React = require('react'),
    quickAddStore = require('stores/quickTaskAddStore'),
    mixins = require('mixins/main'),
    Today = require('./today.jsx'),
    Then = require('./then.jsx');

var SelectDate = React.createClass({
    mixins: mixins('dynamicStyle', 'bindToStore'),
    bindingStores: [quickAddStore],

    getInitialState: function () {
        return {
            display: quickAddStore.startedAdd()
        }
    },

    render: function () {
        return (<div className={ this.cs({ 'select-date': true, 'hidden': !this.state.display }) }>
            <Today />
            <Then />
        </div>);
    }
});

module.exports = SelectDate;
