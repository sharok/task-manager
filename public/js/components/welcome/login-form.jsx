"use strict"

var React = require('react'),
    lz = require('localization').get();

var LoginForm = React.createClass({
    render: function () {
        return (<form className="public-form" action="/auth/login" method="post">
            <section>
                <label className="public-label">{ lz.LOGIN }</label>
                <input name="email" type="text" className="public-input" />

                <label className="public-label margin-top">{ lz.PASSWORD }</label>
                <input name="password" type="password" className="public-input" />
            </section>
            <section className="text-center">
                <input type="submit" className="base-button" value={ lz.ENTER } />
            </section>
        </form>);
    }
});

module.exports = LoginForm;