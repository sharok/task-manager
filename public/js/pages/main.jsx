"use strict"

var React = require('react'),
    PageTitle = require('../components/page-title.jsx');

var Main = React.createClass({
    render: function () {
        return (<div>
            <PageTitle />
        </div>);
    }
});

module.exports = Main;