var React = require('react'),
    LoginForm = require('./login-form.jsx'),
    FormSubmit = require('./form-submit.jsx');

var FormContent = React.createClass({
    render: function () {
        return (
            /*
            *   Тут можно все в этом блоке и вывести: вместе с кнопкой и инпутами
            *   потом будет проще собирать данные ввода,
            *   отлавливать клик и отправлять на сервер
            *   щас надо еще какой то связующий между ними копмоеннт, мароки много
            * */
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