"use strict"

var React = require('react'),
    SvgIco = require('../svg-ico.jsx');

var IncomingFriends = React.createClass({
    render: function () {
        return (<div className="tool">
            <SvgIco name="friends" />
        </div>);
    }
});

module.exports = IncomingFriends;
