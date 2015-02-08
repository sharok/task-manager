var tinylr;

module.exports = {
    run: function () {
        tinylr = require('tiny-lr')();
        tinylr.listen(4002);
    },
    notify: function (event) {
        var fileName = require('path').relative(__dirname, event.path);

        tinylr.changed({
            body: {
                files: [fileName]
            }
        });
    }
};