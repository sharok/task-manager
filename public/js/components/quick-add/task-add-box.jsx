"use strict"

var React = require('react'),
    TaskTextBox = require('./task-text-box.jsx'),
    SelectDate = require('../select-date/select-date.jsx');

var AddBox = React.createClass({
    render: function () {
        return (<div className="task-add-box">
            <TaskTextBox />
            <SelectDate/>
        </div>);
    }
});

module.exports = AddBox;