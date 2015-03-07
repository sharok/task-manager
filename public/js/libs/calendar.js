"use strict"

var calendar = {
    generateDays: function (month, year) {
        var i, days = [],
            daysCount = new Date(year, month + 1, 0).getDate();

        for (i = 1; i <= daysCount; i++) {
            days.push(new Date(year, month, i));
        }

        return days;
    },

    equalDays: function (date1, date2) {
        return date1.getFullYear() == date2.getFullYear() &&
                date1.getMonth() == date2.getMonth() &&
                date1.getDate() == date2.getDate();
    }
};

module.exports = calendar;