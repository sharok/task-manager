"use strict"

var React = require('react'),
    Navigation = require('./navigation.jsx'),
    Clock = require('./clock.jsx'),
    ToolBar = require('./tool-bar.jsx'),
    UpcomingTasks = require('./upcoming-tasks.jsx');

var SideBlock = React.createClass({
    render: function () {

        return (<div className="side-block">

            <div className="section">
                <Clock />
                <div className="part">
                    <ToolBar />
                </div>
                <div className="part">
                    <UpcomingTasks />
                </div>
            </div>

            <div className="section">
                <Navigation />
            </div>
        </div>);
    }
});

module.exports = SideBlock;