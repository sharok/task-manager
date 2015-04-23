"use strict"

var React = require('react'),
    utils = require('libs/utils'),
    SvgIco = require('components/svg-ico.jsx'),
    lz = require('localization').get(),
    mixins = require('mixins/main'),
    keySwitch = require('key-switch'),
    dater = require('libs/dater');

var Calendar = React.createClass({
    mixins: mixins('dynamicStyle'),
    
    _changeMonth: function (forward) {
        var selectDay = forward ?
            dater.nextDay(this._days[this._days.length-1]) :
            dater.prevDay(this._days[0]);

        this._changeDate(selectDay);
    },

    _changeDate: function (date) {
        if (date == null) {
            return;
        }

        this.setState({
            selectDate: date
        });
    },

    _handleClick: function () {
        this._fadeOut(function () {
            var date = this.state.selectDate;
            if (this._timeWasSet) {
                date.setHours(+this.state.time[0]);
                date.setMinutes(+this.state.time[1]);
            }
            this.props.resolve({
                date: date,
                timeWasSet: this._timeWasSet
            });
        }.bind(this));
    },

    _handleTimeChange: function (i, syntheticEvent) {
        var that = this,
            time = utils.clone(this.state.time),
            node = syntheticEvent.target,
            pos = node.selectionStart,
            value = node.value.split(''),
            newDigit = pos === 1 ? value[0] : value[1];

        if (value.length > 3 || isNaN(+newDigit)) {
            return;
        }
        this._timeWasSet = true;
        time[i] = (value[0] || '0') + ((pos === 1 ? value[2] : value[1]) || '0');
        this._pos[i] = pos;
        this.setState({ time: time });
    },

    _trimWeek: function (week) {
        var i,
            weekLength = week.length,
            action = week[0].getDay() === 0 ? 'push' : 'unshift';

        if (week.length === 7) {
            return week;
        }

        for (i = 0; i < 7 - weekLength; i++) {
            week[action](null);
        }

        return week;
    },

    _createWeekDay: function (weekDay, index) {
        return <th key={index}>{ weekDay[0] }</th>;
    },

    _createDay: function (day, index) {
        var dayNumber = day === null ? '' : day.getDate(),
            className = this.cs({
                'active': day !== null ? dater.equalDays(this.state.selectDate, day) : false,
                'disable': day === null
            });

        return <td onClick={ this._changeDate.bind(this, day) } key={index} className={ className }><span>{ dayNumber }</span></td>;
    },

    _fadeOut: function (cb) {
        this.setState({
            display: 'fadeOut'
        });
        setTimeout(cb, 200);
    },

    _trimTime: function (number) {
        var res = number + "";
        return res.length === 2 ? res : "0" + res;  
    },

    getInitialState: function () {
        return {
            selectDate: new Date(),
            time: ['00', '00'],
            display: 'fadeIn'
        }
    },

    componentWillUpdate: function (nextProps, nextState) {
        if (+nextState.time[0] > 23 || +nextState.time[0] < 0) {
            nextState.time[0] = this.state.time[0];
        }
        if (+nextState.time[1] > 60 || +nextState.time[1] < 0) {
            nextState.time[1] = this.state.time[1];
        }
        this._days = dater.monthDays(nextState.selectDate);
    },

    componentWillMount: function () {
        this._timeWasSet = false;
        this._pos = [0, 0];
        this._days = dater.monthDays(this.state.selectDate);
    },

    componentDidUpdate: function (prevProp, prevState) {
        var minuteNode = this.refs.minute.getDOMNode(),
            hourNode = this.refs.hour.getDOMNode();

        if (prevState.time[0] !== this.state.time[0]) {
            hourNode.setSelectionRange(this._pos[0], this._pos[0]);
        }
        if (prevState.time[1] !== this.state.time[1]) {
            minuteNode.setSelectionRange(this._pos[1], this._pos[1]);
        }       
    },

    renderDays: function () {
        var selectDate = this.state.selectDate,
            that = this,
            weekDays = dater.weekDays(),
            weeks = [[]];

        this._days.forEach(function (day, index) {
            weeks[weeks.length-1].push(day);

            if (day.getDay() === 6 && index < that._days.length - 1) {
                weeks.push([]);
            }
        });

        weeks = weeks.map(function (week, index) {
            week = that._trimWeek(week);

            return (<tr key={index}>
                { week.map(that._createDay) }
            </tr>)
        });

        return (<div className="calendar-days">
            <h1>
                <i className="ico left" onClick={ this._changeMonth.bind(this, false) }><SvgIco name="left-arrow" /></i>
                <span>{ dater.format('MMMM YYYY', selectDate) }</span>
                <i className="ico right" onClick={ this._changeMonth.bind(this, true) }><SvgIco name="right-arrow" /></i>
            </h1>
            <section>
                <table><tbody>
                    <tr> {weekDays.map(this._createWeekDay)} </tr>
                    { weeks }
                </tbody></table>
            </section>
        </div>)
    },

    render: function () {
        var selectDate = this.state.selectDate;

        return (<div className={ this.animateCs('base:popup calendar; fadeIn:reduce duration-200ms; fadeOut:reduce-out duration-200ms') }>
            <h1 key="header">{ dater.format('dddd', selectDate) }</h1>
            <div key="banner" className="selected-date">
                <p className="month">{ dater.format('MMM', selectDate) }</p>
                <p className="day">{ dater.format('D', selectDate) }</p>
                <p className="year">{ dater.format('YYYY', selectDate) }</p>
                <p className="time margin-top">
                    <input value={ this.state.time[0] } onChange={ this._handleTimeChange.bind(this, 0) }
                    type="text" ref="hour" className="modal-input" /> 
                    :
                    <input value={ this.state.time[1] } onChange={ this._handleTimeChange.bind(this, 1) }
                    type="text" ref="minute" className="modal-input" /> 
                </p>
            </div>
            { this.renderDays() }
            <section className="text-right">
                <button onClick={ this._handleClick } className="modal-button">{ lz.OK }</button>
            </section>
        </div>);
    }
});

module.exports = Calendar;