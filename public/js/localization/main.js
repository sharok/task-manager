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

    change: function (language) {
        currentLanguage = language;
    }
};

module.exports = localization;