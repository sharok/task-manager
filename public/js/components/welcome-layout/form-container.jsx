var React = require('react'),
    ProjectTitle = require('./project-title.jsx'),
    FormBox = require('./form-content.jsx');

var FormContainer = React.createClass({
    render: function () {
        return (
            <div className='form-container'>
                <ProjectTitle/>
                <FormBox />
            </div>
        );
    }
});

module.exports = FormContainer;