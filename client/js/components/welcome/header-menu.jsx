"use strict"

var React = require('react'),
    assign = require('object-assign'),
    mixins = require('mixins/main'),
    pageStore = require('stores/pageStore'),
    lz = require('localization').get(),
    PAGES = require('constants/pages');

var HeaderLinks = React.createClass({
    mixins: mixins('dynamicStyle', 'bindToStore'),
    bindingStores: [pageStore],

    _handleMouseEnter: function (pageName) {
        this._hover(pageName);
    },

    _handleMouseLeave: function () {
        this._hover();
    },

    _hover: function (pageName) {
        var hover = typeof pageName !== 'undefined';

        this.setState({
            hover: hover,
            hoverPage: hover ? pageName : null
        });
    },

    _createLink: function (link, index) {
        var className = this.cs({
            'active': link.page === this.state.activePage
        });

        return (<li key={ index } ref={ link.page } className={ className }>
            <a onMouseEnter={ this._handleMouseEnter.bind(this, link.page) } onMouseLeave={ this._handleMouseLeave }  href={ link.href } >{ link.title }</a>
        </li>)
    },

    _moveUnderLine: function (pageName) {
        var parentNode,
            underLineNode = this.refs.underline.getDOMNode(),
            linkNode = this.refs[pageName];

        if (typeof linkNode === 'undefined') {
            return;
        }

        linkNode = linkNode.getDOMNode();
        parentNode = linkNode.parentNode;

        assign(underLineNode.style, {
            left: linkNode.offsetLeft - parentNode.offsetLeft + 'px',
            width: linkNode.offsetWidth + 'px'
        });
    },

    getInitialState: function () {
        return {
            activePage: pageStore.currentPageName(),
            hover: false,
            hoverPage: null
        };
    },

    componentWillMount: function () {
        var _links = [
                { href: '/welcome', title: lz.ABOUT_PROJECT, page: PAGES.WELCOME },
                { href: '/signup', title: lz.SIGN_UP, page: PAGES.SIGN_UP },
                { href: '/login', title: lz.LOGIN, page: PAGES.LOGIN }
            ];

        assign(this, {
            _links: _links
        });
    },

    componentDidUpdate: function () {
        var page = this.state.hover ? this.state.hoverPage : this.state.activePage;
        this._moveUnderLine(page);
    },

    componentDidMount: function () {
        this._moveUnderLine(this.state.activePage);
    },

    render: function () {

        return (
            <ul className="header-menu">
                { this._links.map(this._createLink) }
                <div ref="underline" className="underline"></div>
            </ul>
        );
    }
});

module.exports = HeaderLinks;