"use strict"

var React = require('react'),
    SvgIco = require('../svg-ico.jsx');

var Notifications = React.createClass({
    render: function () {
        return (<div className="tool">
            <SvgIco name="bell" />
        </div>);
    }
});

module.exports = Notifications;
