var React = require('react');

var ErrorMessage = React.createClass({
    render: function () {
        return (
            this.props.message
                ? <div className="error-message"><span>{this.props.message}</span></div>
                : null
        )
    }
});

module.exports = ErrorMessage;