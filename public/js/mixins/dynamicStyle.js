var React = require('react'),
    Promise = require('es6-promise').Promise;

var dynamicStyle = {
    componentWillUpdate: function (props) {
        if (props.display === 'fadeOut' && typeof this.componentWillFadeOut !== 'undefined') {
            this.componentWillFadeOut();
        }
    },

    componentWillMount: function () {
        var that = this;

        if (typeof this.fadeOutDuration === 'number') {
            that._fadeOut = function () {
                that.setState({
                    display: 'fadeOut'
                });

                return new Promise(function (resolve) {
                    setTimeout(function () {
                        resolve();
                    }, that.fadeOutDuration);
                });
            }
        }
    },

    animateCs: function (conf) {
        var classSections = conf.split(';'),
            sectionClass = {},
            animateClass = {};

        classSections.forEach(function (classSection) {
            var split = classSection.split(':'),
                classSectionName = split[0].replace(' ', '');
            sectionClass[classSectionName] = split[1];
        });

        if (typeof sectionClass.base !== 'undefined') {
            animateClass[sectionClass.base] = true;
        }

        if (typeof sectionClass.fadeIn !== 'undefined') {
            animateClass[sectionClass.fadeIn] = this.state.display === 'fadeIn';
        }

        if (typeof sectionClass.fadeOut !== 'undefined') {
            animateClass[sectionClass.fadeOut] = this.state.display === 'fadeOut';
        }

        return this.cs(animateClass);
    },

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