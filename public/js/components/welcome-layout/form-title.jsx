var React = require('react');

var FormTitle = React.createClass({
    render: function () {
        return (
            <div className='form-title'>{this.props.title}</div>
        );
    }
});

module.exports = FormTitle;