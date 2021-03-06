"use strict"

var React = require('react'),
    lz = require('localization').get(),
    quickTaskAddActions = require('actions/quickTaskAddActions'),
    SvgIco = require('../svg-ico.jsx');

var TaskAddButton = React.createClass({
    handleClick: function () {
        quickTaskAddActions.saveAdditionTask();
    },

    render: function () {
        return (<button onClick={this.handleClick} button className="tall-button material-button">
            <span>{ lz.ADD }</span>
            <i className="margin-left ico"><SvgIco name="plus" /></i>
        </button>);
    }
});

module.exports = TaskAddButton;