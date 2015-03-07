"use strict"

var React = require('react'),
    SvgIco = require('components/svg-ico'),
    calendar = require('libs/calendar'),
    assign = require('object-assign'),
    mixins = require('mixins/main'),
    weekLz = require('localization').date('week'),
    monthLz = require('localization').date('month');

var Calendar = React.createClass({
    mixins: mixins('dynamicStyle'),

    getInitialState: function () {
        var today = new Date();

        return {
            month: today.getMonth(),
            year: today.getFullYear(),
            days: calendar.generateDays(today.getMonth(), today.getFullYear()),
            selectDate: today,
            display: 'fadeIn'
        };
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

    changeMonth: function (forward) {
        var month = forward ? this.state.month + 1 : this.state.month - 1,
            year = this.state.year, days;

        if (month > 11) {
            month = 0;
            year += 1;
        }

        if (month < 0) {
            month = 11;
            year -= 1;
        }

        days =  calendar.generateDays(month, year);
        this.setState({
            month: month,
            year: year,
            days: days,
            selectDate: forward ? days[0] : days[days.length - 1]
        });
    },

    render: function () {
        var days = this.state.days,
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
                <h1>
                    <i className="ico left" onClick={ this.changeMonth.bind(this, false) }><SvgIco name="left-arrow" /></i>
                    <span>{ monthLz[this.state.month] + ' ' + this.state.year }</span>
                    <i className="ico right" onClick={ this.changeMonth.bind(this, true) }><SvgIco name="right-arrow" /></i>
                </h1>
                <section>
                    <table><tbody>
                        <tr>
                            <th>{ weekLz[0][0] }</th>
                            <th>{ weekLz[1][0] }</th>
                            <th>{ weekLz[2][0] }</th>
                            <th>{ weekLz[3][0] }</th>
                            <th>{ weekLz[4][0] }</th>
                            <th>{ weekLz[5][0] }</th>
                            <th>{ weekLz[6][0] }</th>
                        </tr>
                        { rows.map(function (row) {
                            return <tr>{ row }</tr>
                        }) }
                    </tbody></table>
                </section>
            </div>
            <section className="text-right">
                <button onClick={ this.handleClick } className="modal-button">ok</button>
            </section>
        </div>);
    }
});

module.exports = Calendar;


