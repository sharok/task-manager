"use strict"
var languages = require('constants/languages'),
    invariant = require('invariant'),
    defaultLanguage = languages.EN,
    currentLz = null,
    lz = {};

lz[languages.EN] = {
    words: require('./words/en'),
    sentences: require('./sentences/en')
};

lz[languages.RU] = {
    words: require('./words/ru'),
    sentences: require('./sentences/en')
};

currentLz = lz[defaultLanguage];

var localization = {
    get: function (type) {
        if (type === 'sentences') {
            return currentLz.sentences;
        }

        return currentLz.words;
    },

    change: function (language) {
        invariant(lz[language], 'unknown localization `%s`', language);

        currentLz = lz[language];
    }
};

module.exports = localization;