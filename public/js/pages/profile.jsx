"use strict"

var React = require('react'),
    Layout = require('../components/layout.jsx'),
    PageTitle = require('../components/page-title.jsx');

var Profile = React.createClass({
    render: function () {
        return (<Layout>
            <PageTitle />
        </Layout>)
    }
});

module.exports = Profile;