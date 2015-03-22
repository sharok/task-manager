"use strict"

var React = require('react'),
    SideBlock = require('./../side-bar/side-block.jsx');

var DeskLayout = React.createClass({
    render: function () {
        return (<div className="desk">
            <div className="left-block">
                <SideBlock />
            </div>
            <div className="content-block">
                { this.props.children }
            </div>
        </div>);
    }
});

module.exports = DeskLayout;