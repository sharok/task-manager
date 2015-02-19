"use strict"

var React = require('react'),
    SideBlock = require('./side-block.jsx');

var Layout = React.createClass({
    render: function () {
        return (<div className="layer task-manager">
            <div className="side-block">
                <SideBlock />
            </div>
            <div className="content-block">
                { this.props.children }
            </div>
        </div>);
    }
});

module.exports = Layout;