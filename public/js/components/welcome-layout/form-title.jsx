var React = require('react');

var FormTitle = React.createClass({
    render: function () {
        return (
            //FormTitle надо с ProjectTitle в одну, я так подумал, просто
            //этот зеленый заголовок негде использоваться не будет
            <div className='form-title'>{this.props.title}</div>
        );
    }
});

module.exports = FormTitle;