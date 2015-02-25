var React = require('react');

var Logo = React.createClass({
    render: function () {
        return (
            <div className="title-description">
                <p className="title">clevy</p>
                <p className="description">the cleverest task manager</p>
            </div>
        );
    }
});

module.exports = Logo;