'use strict';

var Task,
	Schema = require('mongoose').Schema,
	BaseModel = require('../modules/baseModel');

Task = module.exports = BaseModel({
	owners: [Schema.Types.ObjectId],
	title: String,
	date: Date,
	priority: Number,
	timeWasSet: Boolean,
	done: Boolean
});