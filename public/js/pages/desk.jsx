"use strict"

var React = require('react'),
    PageTitle = require('components/page-title.jsx'),
    TaskQuickAdd = require('components/quick-add/task-quick-add.jsx');

var Main = React.createClass({
    render: function () {
        return (<div>
            <div className="content-section">
                <TaskQuickAdd />
            </div>
        </div>);
    }
});

module.exports = Main;