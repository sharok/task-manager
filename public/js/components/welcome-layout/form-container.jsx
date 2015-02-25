var React = require('react'),
    ProjectTitle = require('./project-title.jsx');

var FormContainer = React.createClass({
    render: function () {
        return (
            <div className='login-container'>
                <ProjectTitle/>
            </div>
        );
    }
});

module.exports = FormContainer;