"use strict"

var React = require('react');

var Clock = React.createClass({
    render: function () {
        return (<div className="clock">
            <strong>13:56</strong>
            <small>sunday, 9 february</small>
        </div>);
    }
});

module.exports = Clock;