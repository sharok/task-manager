var React = require('react');

var FormSubmit = React.createClass({
    render: function () {
        return (
            <div className="form-submit">
                <input className="submit-button" type="submit" value="Войти"/>
            </div>
        );
    }
});

module.exports = FormSubmit;