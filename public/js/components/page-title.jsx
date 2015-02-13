"use strict"

var React = require('react'),
    pageStore = require('../stores/pageStore');

var getPageTitleState = function () {
    return {
        title: pageStore.currentPageTitle()
    }
};

var PageTitle = React.createClass({
    getInitialState: function () {
        return getPageTitleState();
    },

    componentWillMount: function () {
        pageStore.addChangeListener(function () {
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