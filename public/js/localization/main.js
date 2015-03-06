"use strict"
var languages = require('constants/languages'),
    currentLanguage = languages.EN;

var localization = {
    get: function () {
        if (currentLanguage == languages.EN)
            return require('./en');

        if (currentLanguage == languages.RU)
            return require('./ru');

        throw new Error('unknown localization');
    },

    date: function (type) {
        var dateLz;

        if (currentLanguage == languages.EN)
            dateLz = require('./date/en');
        else
            throw new Error('unknown localization');

        if (type === 'month') {
            return [
                dateLz.JANUARY, dateLz.FEBRUARY, dateLz.MARCH,
                dateLz.APRIL, dateLz.MAY, dateLz.JUNE,
                dateLz.JULY, dateLz.AUGUST, dateLz.SEPTEMBER,
                dateLz.OCTOBER, dateLz.NOVEMBER, dateLz.DECEMBER
            ];
        }

        if (type === 'week') {
            return [
                dateLz.SUNDAY, dateLz.MONDAY, dateLz.TUESDAY,
                dateLz.WEDNESDAY, dateLz.THURSDAY, dateLz.FRIDAY,
                dateLz.SATURDAY
            ];
        }

        return dateLz;
    },

    change: function (language) {
        currentLanguage = language;
    }
};

module.exports = localization;