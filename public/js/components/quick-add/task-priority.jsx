"use strict"

var React = require('react'),
    lz = require('localization').get(),
    SvgIco = require('../svg-ico.jsx');

var TaskPriority = React.createClass({


    render: function () {
        return (<div className="task-priority">
            <strong>{ lz.PRIORITY }</strong>
            <section>
                <i className="active"><SvgIco name="star" /></i>
                <i className="active"><SvgIco name="star" /></i>
                <i><SvgIco name="star" /></i>
                <i><SvgIco name="star" /></i>
                <i><SvgIco name="star" /></i>
            </section>
        </div>);
    }
});

module.exports = TaskPriority;