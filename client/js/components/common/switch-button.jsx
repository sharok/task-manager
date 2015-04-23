"use strict"

var React = require('react'),
    mixins = require('mixins/main');

var SwitchButton = React.createClass({
    mixins: mixins('dynamicStyle'),

    _selectButton: function (key) {
        this.setState({
            select: key
        });
    },

    _handleClick: function (key) {
        var allow = this.props.onChange(key);

        if (allow) {
            this._selectButton(key);
        }
    },

    getInitialState: function () {
        return {
            display: 'none',
            select: ''
        }
    },

    componentDidMount: function () {
        if (typeof this.props.defaultButton !== 'undefined') {
            this._selectButton(this.props.defaultButton);
        }

        if (typeof this.props.init !== 'undefined' ) {
            this.props.init({
                select: this._selectButton
            });
        }
    },

    componentWillUpdate: function (nextProps, nextState) {
        if (typeof nextProps.value !== 'undefined') {
            nextState.select = nextProps.value;
        }
    },

    render: function () {
        var that = this,
            buttons = [];

        Object.keys(this.props.buttons).forEach(function (key) {
            var title = that.props.buttons[key],
                className = that.cs({
                    'active': that.state.select === key
                });

            buttons.push(<button key={ key } onClick={ that._handleClick.bind(that, key) } className={ className }>{ title }</button>);
        });

        return (<div className="switch-button">
            { buttons }
        </div>);
    }
});

module.exports = SwitchButton;

