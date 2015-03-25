"use strict"

var React = require('react'),
    route = require('route'),
    mixins = require('mixins/main'),
    pageStore = require('stores/pageStore');

var TaskManager = React.createClass({
    mixins: mixins('bindToStore'),
    bindingStores: [pageStore],

    _initPage: function (page) {
        this._page = page;
    },

    getInitialState: function () {
        return {
            page: pageStore.currentPage(),
            pageTitle: pageStore.currentPageTitle(),
            animate: pageStore.currentPageAnimate(),
            layout: pageStore.currentPageLayout()
        }
    },

    componentWillMount: function () {
        this._fadeOut = true;
        this._page = null;
        route();
    },
    
    componentDidUpdate: function () {
        document.getElementsByTagName('title')[0].innerText = this.state.pageTitle;
        this._fadeOut = false;
    },

    shouldComponentUpdate: function (nextProps, nextState) {
        var that = this;

        if (this.state.page === null || !this.state.animate) {
            return true;
        }

        if (this._fadeOut) {
            return true;
        }

        this._page.fadeOut().then(function () {
            that._fadeOut = true;
            that.setState(nextState);
        });

        return false;
    },

    render: function () {
        var CurrentPage = this.state.page,
            Layout = this.state.layout;

        if (CurrentPage == null) return <div></div>;

        return <Layout><CurrentPage onInit={ this._initPage } /></Layout>;
    }
});

module.exports = TaskManager;
