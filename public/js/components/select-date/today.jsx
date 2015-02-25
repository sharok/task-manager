"use strict"

var React = require('react'),
    lz = require('localization').get();

var Today = React.createClass({
    render: function () {
        return (<div className="select-date-variant active">
            { lz.TODAY }
        </div>);
    }
});

module.exports = Today;