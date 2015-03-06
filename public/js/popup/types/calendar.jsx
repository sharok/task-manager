"use strict"

var React = require('react'),
    calendar = require('libs/calendar'),
    assign = require('object-assign'),
    mixins = require('mixins/main'),
    weekLz = require('localization').date('week'),
    monthLz = require('localization').date('month');

var Calendar = React.createClass({
    mixins: mixins('dynamicStyle'),

    getInitialState: function () {
        return {
            selectDate: new Date(),
            display: 'fadeIn'
        };
    },

    componentWillMount: function () {
        var today = new Date();
        this.days = calendar.generateDays(today.getMonth() + 1, today.getFullYear());
    },

    fadeOut: function (cb) {
        this.setState({
            display: 'fadeOut'
        });
        setTimeout(cb, 200);
    },

    handleDayClick: function (date) {
        this.setState({
            selectDate: date
        });
    },

    handleClick: function () {
        this.fadeOut(function () {
            this.props.resolve(this.state.selectDate);
        }.bind(this));
    },

    render: function () {
        var days = this.days,
            selectDate = this.state.selectDate,
            day = days[0], i, j,
            dayOfWeek, rows = [[]];

        for (i = 0; i < day.getDay(); i++) {
            rows[rows.length-1].push(<td></td>);
        }

        dayOfWeek = i;

        for (j = 0; j < days.length; j++) {
            day = days[j];

            if (day.getDay() == 0) {
                rows.push([])
            }

            rows[rows.length-1].push(
                <td onClick={ this.handleDayClick.bind(this, day) } className={ this.cs({ 'select': calendar.equalDays(day, selectDate) }) }>
                    <span>{ day.getDate() }</span>
                </td>);

            dayOfWeek = dayOfWeek == 6 ? 0 : dayOfWeek + 1;
        }

        return (<div className={ this.animateCs('base:popup calendar; fadeIn:reduce duration-200ms; fadeOut:reduce-out duration-200ms') }>
            <h1>{ weekLz[selectDate.getDay()] }</h1>
            <div className="selected-date">
                <p className="month">{ monthLz[selectDate.getMonth()].slice(0,3) }</p>
                <p className="day">{ selectDate.getDate() }</p>
                <p className="year">{ selectDate.getFullYear() }</p>
            </div>
            <div className="calendar-days">
                <h1>{ monthLz[selectDate.getMonth()] + ' ' + selectDate.getFullYear() }</h1>
                <section>
                    <table>
                        <tr>
                            <th>S</th>
                            <th>M</th>
                            <th>T</th>
                            <th>W</th>
                            <th>T</th>
                            <th>F</th>
                            <th>S</th>
                        </tr>
                        { rows.map(function (row) {
                            return <tr>{ row }</tr>
                        }) }
                    </table>
                </section>
            </div>
            <section className="text-right">
                <button onClick={ this.handleClick } className="modal-button">ok</button>
            </section>
        </div>);
    }
});

module.exports = Calendar;


