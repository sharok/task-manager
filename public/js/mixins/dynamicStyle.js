var React = require('react');

var dynamicStyle = {
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

module.exports = dynamicStyle;