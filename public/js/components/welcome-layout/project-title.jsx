var React = require('react'),
    Logo = require('./logo.jsx'),
    FormTitle = require('./form-title.jsx');

var ProjectTitle = React.createClass({
    render: function () {
        return (
            <div className='title-container'>
                <Logo/>
                <FormTitle />
            </div>
        );
    }
});

module.exports = ProjectTitle;