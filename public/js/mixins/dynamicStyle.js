var React = require('react');

module.exports = {
    cs: function (classConfig) {
        return React.addons.classSet(classConfig);
    },

    st: function (stylesConf) {
        var style= {};

        Object.getOwnPropertyNames(stylesConf).forEach(function (styleName) {
            var styleConf = stylesConf[styleName];

            if (styleConf.when) {
                style[styleName] = styleConf.value;
            }
        });

        return style;
    }
};