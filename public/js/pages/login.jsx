"use strict"

var React = require('react'),
    FormContainer = require('../components/welcome-layout/form-container.jsx');

var Enter = React.createClass({
    render: function () {
        return (
            //Нужно собирать компоненты, а тут все зашыто в этом FormContainer,
            //когда будем делать регистрацию все это расковыривать
            //или параметры прокидывать на основе которых он там будет разные формы выбирать
            //можно примерно так:
            /*
                #MaterialBlock //<FormContainer />

                    #ClavyLogo //ну он уже готовый <Logo />

                    #Title  //ща он form-title можно сюда просто это div вынести, в нем врядли какая та динамика будет
                            //<div className='form-title'>login</div>

                    #LoginForm //и потом можно будет менять только эту часть
             */
            <FormContainer/>
        );
    }
});

module.exports = Enter;