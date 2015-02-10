"use strict"

var React = require('react'),
    dynamicStyle = require('../mixins/dynamicStyle'),
    pageStore = require('../stores/pageStore'),
    pages = require('../constants/pages'),

    getNavigationState = function () {
        return {
            activePageName: pageStore.currentPageName()
        }
    };

module.exports = React.createClass({
    mixins: [dynamicStyle],

    getInitialState: function () {
        return getNavigationState();
    },

    componentWillMount: function () {
        pageStore.addChangeListener(function () {
            this.setState(getNavigationState());
        }.bind(this));
    },

    createLink: function (link) {
        var className = this.cs({
            'active': link.pageName == this.state.activePageName
        });

        return <li className={className}><a href={ link.href }>{ link.title }<i className="underline"></i></a></li>
    },

    render: function () {
        return (<ul className="navigation">
            <b>Навигация</b>
            {
                [

                    { title: 'сегодня', pageName: pages.MAIN, href: '/' },
                    { title: 'все задачи', pageName: pages.TASKS, href: '/tasks' },
                    { title: 'профиль', pageName: pages.PROFILE, href: '/profile' }

                ].map(this.createLink)
            }
        </ul>)
    }
});