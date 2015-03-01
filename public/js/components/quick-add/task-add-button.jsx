"use strict"

var React = require('react'),
    quickTaskAddActions = require('actions/quickTaskAddActions'),
    SvgIco = require('../svg-ico.jsx');

var TaskAddButton = React.createClass({
    handleClick: function () {
        quickTaskAddActions.saveAdditionTask();
    },

    render: function () {
        return (<button onClick={this.handleClick} button className="tall-button material-button">
            <span>Добавить</span>
            <i className="margin-left ico"><SvgIco name="plus" /></i>
        </button>);
    }
});

module.exports = TaskAddButton;