var React = require('react');

var LoginForm = React.createClass({
    render: function () {
        return (
            <form className="form-margin" action="">
                <div className="input-label">
                    <label for="email">логин</label>
                </div>
                <div className="input-container">
                    <input type="email" id="email" autofocus/>
                </div>
                <div className="input-label">
                    <label for="password">пароль</label>
                </div>
                <div className="input-container">
                    <input type="password" id="password"/>
                </div>
            </form>
        );
    }
});

module.exports = LoginForm;