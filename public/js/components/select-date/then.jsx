"use strict"

var React = require('react'),
    lz = require('localization').get();

var Then = React.createClass({
    render: function () {
        return (<div className="select-date-variant">
            { lz.THEN }
        </div>);
    }
});

module.exports = Then;