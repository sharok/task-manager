var React = require('react');

var Logo = React.createClass({
    render: function () {
        return (
            <div class="title-description">
                <p class="title">clevy</p>
                <p class="description">the cleverest task manager</p>
            </div>
        );
    }
});

module.exports = Logo;