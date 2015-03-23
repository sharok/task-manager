"use strict"

var React = require('react'),
    lz = require('localization').get(),
    WelcomeBlock = require('components/welcome/welcome-block.jsx');

var SignUp = React.createClass({
    init: function (welcome) {
        this.props.onInit(welcome);
    },

    render: function () {
        return (<WelcomeBlock  onInit={ this.init } title={ lz.SIGN_UP }>
            <form className="public-form" action="/auth/signup" method="post">
                <section>
                    <label className="public-label">{ lz.LOGIN }</label>
                    <input name="email" type="text" className="public-input" />

                    <label className="public-label margin-top">{ lz.PASSWORD }</label>
                    <input name="password" type="password" className="public-input" />
                </section>
                <section className="text-center">
                    <input type="submit" className="base-button" value={ lz.REGISTER } />
                </section>
            </form>
        </WelcomeBlock>);
    }
});

module.exports = SignUp;