"use strict"

var React = require('react'),
    dynamicStyle = require('../mixins/dynamicStyle');

module.exports = React.createClass({
    mixins: [dynamicStyle],

    render: function () {
        var value = +this.props.value,

        className = this.cs({
            'filler': true,
            'low': value <= 25,
            'medium': value < 60 && value > 25,
            'high': value >= 60
        });

        return (<div className="progress-bar">
            <div className={ className } style={ { width: value + '%' } }></div>
        </div>)
    }
});