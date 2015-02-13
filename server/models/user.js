var BaseModel = require('../modules/baseModel'),
    bcrypt = require('bcrypt-nodejs'),
    user;

user = BaseModel({
    local: {
        email: String,
        password: String
    }
});

user.model.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

user.model.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = user;