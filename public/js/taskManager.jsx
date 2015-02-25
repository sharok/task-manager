"use strict"

var React = require('react'),
    route = require('route'),
    pageStore = require('stores/pageStore'),
    bindToStore = require('mixins/bindToStore');

var taskManagerState = function () {
    return {
        page: pageStore.currentPage(),
        layout: pageStore.currentPageLayout()
    }
};

var TaskManager = React.createClass({
    mixins: [bindToStore],

    getInitialState: function () {
        return taskManagerState();
    },

    componentWillMount: function () {
        this.onStoreChange(pageStore, function () {
            this.setState(taskManagerState());
        }.bind(this));

        route();
    },
    
    render: function () {
        var CurrentPage = this.state.page,
            Layout = this.state.layout;

        if (CurrentPage == null) return <div></div>;

        return <Layout><CurrentPage /></Layout>;
    }
});

module.exports = TaskManager;
