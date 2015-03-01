"use strict"

var React = require('react'),
    lz = require('localization').get(),
    pageStore = require('stores/pageStore'),
    mixins = require('mixins/main'),
    PAGES = require('constants/pages');

var Navigation = React.createClass({
    mixins: mixins('dynamicStyle', 'bindToStore'),
    bindingStores: [pageStore],

    getInitialState: function () {
        return {
            activePageName: pageStore.currentPageName()
        };
    },

    createLink: function (link) {
        var className = this.cs({
            'active': link.pageName == this.state.activePageName
        });

        return <li className={className}><a href={ link.href }>{ link.title }<i className="underline"></i></a></li>
    },

    render: function () {
        var links = [

            { title: lz.DESK, pageName: PAGES.DESK, href: '/' },
            { title: lz.PROFILE, pageName: PAGES.PROFILE, href: '/profile' },
            { title: lz.EXIT, pageName: PAGES.NONE, href: '/logout' }

        ];

        return (<ul className="navigation">
            { links.map(this.createLink) }
        </ul>)
    }
});

module.exports = Navigation;