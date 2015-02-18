"use strict"

var React = require('react');

var Clock = React.createClass({
    render: function () {
        return (<div className="clock">
            <strong>13:56</strong>
            <small>воскресенье, 9 февраля</small>
        </div>);
    }
});

module.exports = Clock;