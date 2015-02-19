"use strict"

var React = require('react'),
    pageStore = require('../stores/pageStore'),
    bindToStore = require('../mixins/bindToStore');

var getPageTitleState = function () {
    return {
        title: pageStore.currentPageTitle()
    }
};

var PageTitle = React.createClass({
    mixins: [bindToStore],

    getInitialState: function () {
        return getPageTitleState();
    },

    componentWillMount: function () {
        this.onStoreChange(pageStore, function () {
            this.setState(getPageTitleState());
        }.bind(this));
    },

    render: function () {
        return (<h1 className="page-title">
            <strong>{ this.state.title }</strong>
        </h1>)
    }
});

module.exports = PageTitle;