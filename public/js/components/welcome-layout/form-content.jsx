var React = require('react'),
    LoginForm = require('./login-form.jsx'),
    FormSubmit = require('./form-submit.jsx');

var FormContent = React.createClass({
    render: function () {
        return (
            <div className="form-content">
                <div className="form-controls">
                    <LoginForm />
                </div>
                <FormSubmit/>
            </div>
        );
    }
});

module.exports = FormContent;