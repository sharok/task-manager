"use strict"

var React = require('react'),
    Layout = require('../components/layout.jsx'),
    PageTitle = require('../components/page-title.jsx');

var Main = React.createClass({
    render: function () {
        return (<Layout>
            <PageTitle />
        </Layout>);
    }
});

module.exports = Main;