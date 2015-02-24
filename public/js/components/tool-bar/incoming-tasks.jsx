"use strict"

var React = require('react'),
    SvgIco = require('../svg-ico.jsx');

var IncomingTasks = React.createClass({
    render: function () {
        return (<div className="tool">
            <SvgIco name="incoming" />
        </div>);
    }
});

module.exports = IncomingTasks;
