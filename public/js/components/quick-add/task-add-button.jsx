"use strict"

var React = require('react'),
    SvgIco = require('../svg-ico.jsx');

var TaskAddButton = React.createClass({
    render: function () {
        return (<button className="task-add-button">Добавить<i><SvgIco name="plus" /></i></button>);
    }
});

module.exports = TaskAddButton;