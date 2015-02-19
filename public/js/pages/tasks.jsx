"use strict"

var React = require('react'),
    PageTitle = require('../components/page-title.jsx');

var Tasks = React.createClass({
    render: function () {
        return (<div>
            <PageTitle />
        </div>)
    }
});

module.exports = Tasks;