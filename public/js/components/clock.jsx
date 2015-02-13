"use strict"

var React = require('react');

var Clock = React.createClass({
    render: function () {
        return (<div className="clock">
            <small>9 февраля</small>
            <strong>13:56</strong>
        </div>);
    }
});

module.exports = Clock;