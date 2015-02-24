var React = require('react'),
    HeaderLinks = require('./header-links.jsx');

var Header = React.createClass({
    render: function () {
        return (
            <div className='header'>
                <nav className='header-menu'>
                    <HeaderLinks/>
                </nav>
            </div>
        );
    }
});

module.exports = Header;