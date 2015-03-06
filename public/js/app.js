"use strict"

var React = require('react'),
    TaskManager = React.createFactory(require('taskManager.jsx')),
    Popup = React.createFactory(require('./popup/popup.jsx'));

React.render(new TaskManager(), document.getElementById('application'));
React.render(new Popup(), document.getElementById('modal'));