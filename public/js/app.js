var React = require('react'),
    TaskManager = React.createFactory(require('./taskManager.jsx'));

React.render(new TaskManager(), document.getElementById('application'))