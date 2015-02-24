var React = require('react'),
    dynamicStyle = require('../../mixins/dynamicStyle'),
    bindToStore = require('../../mixins/bindToStore'),
    pageStore = require('../../stores/pageStore'),
    PAGES = require('../../constants/pages');

window.PageStore = pageStore;

var getNavigationState = function () {
    return {
        activePageName: pageStore.currentPageName()
    };
};

var HeaderLinks = React.createClass({
    mixins: [dynamicStyle, bindToStore],

    getInitialState: function () {
        return getNavigationState();
    },

    componentWillMount: function () {
        this.onStoreChange(pageStore, function () {
            this.setState(getNavigationState());
        }.bind(this));
    },

    render: function () {
        return (
            <ul>
                <li>
                    <a href="/about">About</a>
                </li>
                <li>
                    <a href="/login">Login</a>
                </li>
                <li>
                    <a href="/signup">Signup</a>
                </li>
                <div className="underline"></div>
            </ul>
        );
    }
});

module.exports = HeaderLinks;