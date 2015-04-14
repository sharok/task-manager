var appDispatcher = require('appDispatcher'),
	ACTIONS = require('constants/actionTypes'),
	tasksStore = require('../tasksStore'),
    assert = require('assert');

var globalTasks = [
	{ _id: 1, title: 'first', today: true, date: new Date(), priority: 2  },
	{ _id: 2, title: 'second', today: true, date: new Date(), priority: 5 },
	{ _id: 3, title: 'third', today: false, date: new Date(2015, 3, 5), priority: 2 },
	{ _id: 4, title: 'fourth', today: true, date: new Date(2015, 3, 5), priority: 2 },
	{ _id: 5, title: 'fivth', today: false, date: new Date(2015, 3, 5), priority: 4 },
];

var eachHave = function (ar, field, value) {
	var check = true;
	ar.forEach(function (i) {
		if (i[field] === value) return;
		check = false;
	});

	return check;
};

describe('Tasks Store & Task Actions', function() {
	describe('Methods', function() {
		describe('#count()', function() {
			it('should return 0 if store is empty', function() {
				tasksStore.set([]);
				assert.equal(tasksStore.count(), 0);
			});

			it('should return 3 if store keeps 3 items', function() {
				tasksStore.set([1, 2, 3]);
				assert.equal(tasksStore.count(), 3);
			});
		});

		describe('#get()', function() {
			it('should return all tasks if filter model was not passed', function() {
				var tasks = [1,2,3,4,5];
				tasksStore.set(tasks);
				assert.deepEqual(tasksStore.get(), tasks);
			});

			it('should return task by id', function() {
				tasksStore.set(globalTasks);
				assert.deepEqual(tasksStore.get(2), globalTasks[1]);
			});

			it('should return task by filter model', function() {
				tasksStore.set(globalTasks);
				assert.deepEqual(tasksStore.get({
					today: true, 
					priority: 2
				}), [ globalTasks[0], globalTasks[3] ]);
			});

			it('should return clone of task with seeking id', function() {
				tasksStore.set([{ _id: 5, title: 'title' }]);
				var task = tasksStore.get(5);
				task.title = 'another title';
				assert.equal(tasksStore.get(5).title, 'title');
			});

			it('should return clone list of tasks', function() {
				tasksStore.set([{ _id: 5, title: 'title' }]);
				var tasks = tasksStore.get();
				tasks[0].title = 'another title';
				assert.equal(tasksStore.get()[0].title, 'title');
			});
		});

		describe('#tasksForToday()', function() {
			it('should return only tasks with field `today` is true', function() {
				tasksStore.set(globalTasks);
				assert.ok(eachHave(tasksStore.tasksForToday(), 'today', true));
			});
		});

		describe('#tasksForThen()', function() {
			it('should return only tasks with field `today` is false', function() {
				tasksStore.set(globalTasks);
				assert.ok(eachHave(tasksStore.tasksForThen(), 'today', false));
			});
		});
	});

	describe('Actions Handling', function() {
		beforeEach(function () {
			tasksStore.set([]);
		});

		describe('#SAVED_TASK', function() {
			it('should add task', function() {
				var newTask = {
					_id: 15
				};

				tasksStore.invokeAction(ACTIONS.SAVED_TASK, {
					action: {
						task: newTask
					}
				});

				assert.ok(tasksStore.get(15));
			});
		});

		describe('#PUT_TASKS_PACK', function() {
			it('should add pack of tasks', function() {
				tasksStore.invokeAction(ACTIONS.PUT_TASKS_PACK, {
					action: {
						tasks: globalTasks
					}
				});

				assert.ok(tasksStore.count(), globalTasks.length);
			});
		});

		describe('#TASK_DONE', function() {
			it('should change field `done` of task to true', function() {
				tasksStore.set([{
					_id: 5,
					done: false
				}]);

				tasksStore.invokeAction(ACTIONS.TASK_DONE, {
					action: {
						taskId: 5
					}
				});

				assert.ok(tasksStore.get(5).done);
			});
		});
	});
});