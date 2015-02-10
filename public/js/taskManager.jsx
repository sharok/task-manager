"use strict"

var React = require('react'),
    SideBlock = require('./components/side-block.jsx'),
    route = require('./route'),
    pageStore = require('./stores/pageStore'),

    taskManagerState = function () {
        return {
            currentPage: pageStore.currentPage()
        }
    };

module.exports = React.createClass({
    getInitialState: function () {
        return taskManagerState();
    },

    componentWillMount: function () {
        pageStore.addChangeListener(function () {
            this.setState(taskManagerState());
        }.bind(this));

        route();
    },
    
    render: function () {
        var CurrentPage = this.state.currentPage || <div></div>;

        return (<div className="layer task-manager">
            <div className="side-block">
                <SideBlock />
            </div>
            <div className="content-block">
                <CurrentPage />
            </div>
        </div>)
    }
});
