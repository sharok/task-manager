"use strict"

var moment = require('moment');
require('moment-range');

var dater = {
    monthDays: function (month, year) {
        var daysCount,
            days = [];

        if (month instanceof Date) {
            year = month.getFullYear();
            month = month.getMonth();
        }

        daysCount = moment({ year: year, month: month }).daysInMonth();
        moment
            .range(moment({ year: year, month: month, day: 1 }), moment({ year: year, month: month, day: daysCount }))
            .by('days', function (day) {
                days.push(day.toDate());
            });

        return days;
    },

    equalDays: function (date1, date2) {
        if ( date1 == null || date2 == null ) {
            return false;
        }

        return date1.getFullYear() == date2.getFullYear() &&
                date1.getMonth() == date2.getMonth() &&
                date1.getDate() == date2.getDate();
    },

    nextDay: function (date) {
        var maxDays = moment(date).daysInMonth(),
            day = date.getDate() + 1,
            nextMonth = day > maxDays,
            month = nextMonth ? date.getMonth() + 1 : date.getMonth(),
            nextYear = month > 11,
            year = nextYear ? date.getFullYear() + 1 : date.getFullYear();

        day = nextMonth ? 1 : day;
        month = nextYear ? 0 : month;

        return moment({ year: year, month: month, day: day }).toDate();
    },

    prevDay: function (date) {
        var day = date.getDate() - 1,
            prevMonth = day < 1,
            month = prevMonth ? date.getMonth() - 1 : date.getMonth(),
            prevYear = month < 0,
            year = prevYear ? date.getFullYear() - 1 : date.getFullYear();

        day = prevMonth ? moment({ year: year, month: month }).daysInMonth() : day;
        month = prevYear ? 11 : month;

        return moment({ year: year, month: month, day: day }).toDate();
    },

    weekDays: function () {
        return moment.weekdays();
    },

    format: function (formatString, date) {
        return moment(date).format(formatString);
    },

    parse: function (date) {
        return moment(date).toDate();
    }
};

module.exports = dater;