"use strict"

var React = require('react'),
    route = require('route'),
    mixins = require('mixins/main'),
    pageStore = require('stores/pageStore');

var TaskManager = React.createClass({
    mixins: mixins('bindToStore'),
    bindingStores: [pageStore],

    getInitialState: function () {
        return {
            page: pageStore.currentPage(),
            layout: pageStore.currentPageLayout()
        }
    },

    componentWillMount: function () {
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
