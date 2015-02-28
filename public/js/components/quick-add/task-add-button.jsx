"use strict"

var React = require('react'),
    quickTaskAddActions = require('actions/quickTaskAddActions'),
    SvgIco = require('../svg-ico.jsx');

var TaskAddButton = React.createClass({
    handleClick: function () {
        quickTaskAddActions.saveAdditionTask();
    },

    render: function () {
        return (<button onClick={this.handleClick} button className="task-add-button">Добавить<i><SvgIco name="plus" /></i></button>);
    }
});

module.exports = TaskAddButton;