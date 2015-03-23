"use strict"

var initialized = {
    componentDidMount: function () {
        if (typeof this.init !== 'undefined' && typeof this.props.onInit !== 'undefined') {
            this.props.onInit(this.init());
        }
    }
};

module.exports = initialized;
