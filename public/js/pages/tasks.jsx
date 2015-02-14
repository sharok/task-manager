"use strict"

var React = require('react'),
    Layout = require('../components/layout.jsx'),
    PageTitle = require('../components/page-title.jsx');

var Tasks = React.createClass({
    render: function () {
        return (<Layout>
            <PageTitle />
        </Layout>)
    }
});

module.exports = Tasks;