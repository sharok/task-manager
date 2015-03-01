"use strict"

var React = require('react'),
    TaskManager = React.createFactory(require('taskManager.jsx')),
    Modal = React.createFactory(require('./modal/modal.jsx'));

React.render(new TaskManager(), document.getElementById('application'));
React.render(new Modal(), document.getElementById('modal'));