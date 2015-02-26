var React = require('react'),
    ProjectTitle = require('./project-title.jsx'),
    FormBox = require('./form-content.jsx');

var FormContainer = React.createClass({
    render: function () {
        return (
            <div className='form-container'>
               { this.props.children }
            </div>
        );
    }
});

module.exports = FormContainer;