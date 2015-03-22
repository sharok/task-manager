var React = require('react');

var Logo = React.createClass({
    render: function () {
        return (
            <div className="project-logo">
                <strong>clavy</strong>
                <small>the cleverest task manager</small>
            </div>
        );
    }
});

module.exports = Logo;