var React = require('react');

var FormContent = React.createClass({
    render: function () {
        return (
            //ты писал чтобы все вынести сюда(инпуты кнопку), но лучше же как щас?
            // т.к. инпуты будут менятся (login signup)

            //кнопка тож будет меняться: название, и обработчик
            /*
            *примерно такое
            * <SmthWithLabel label="login"><input /></SmthWithLabel>
            * <SmthWithLabel label="password"><input /></SmthWithLabel>
            * <div className="text-center border-top padding">
            *   <button onClick={ this._handleEnter }>Enter</button>
            * </div>
            * */

            <div className="form-content">
                <div className="form-controls">
                    {this.props.children}
                </div>
                <div className="form-submit">
                    <input className="submit-button" type="submit" value="Войти"/>
                </div>
            </div>
        );
    }
});

module.exports = FormContent;