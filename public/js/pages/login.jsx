"use strict"

var React = require('react'),
    FormContainer = require('../components/welcome-layout/form-container.jsx'),
    ProjectTitle = require('../components/welcome-layout/project-title.jsx'),
    FormContent = require('../components/welcome-layout/form-content.jsx'),
    LoginForm = require('../components/welcome-layout/login-form.jsx');

var Enter = React.createClass({
    render: function () {
        return (
            //   хотя думаю удалить ProjectTitle. У нас же там имя менятся будет (ВХОД или РЕГИСТРАЦИЯ)
            //   и лучше вставить div.title-container прям сюда, и в него два компонента <Logo/> и <FormTitle />

            <FormContainer>
                <ProjectTitle title='Login'/>
                <FormContent>
                    <LoginForm/>
                </FormContent>
            </FormContainer>
        );
    }
});

module.exports = Enter;