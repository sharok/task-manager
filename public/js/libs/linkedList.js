"use strict"

var node = function (value) {
    return {
        value: value,
        prev: null,
        next: null
    };
};

var LinkedList = function () {
    var items = Array.prototype.slice.apply(arguments);
    if (items.length === 0) return;

    this._first = node(items[0]);
    this._current = this._first;
    this._last = this._first;

    for (var i = 1; i < items.length; i++) {
        var oldLast = this._last;
        this._last = node(items[i]);
        this._last.prev = oldLast;
        oldLast.next = this._last;
    }
};

LinkedList.prototype.next = function (cycle) {
    if (this._current.next !== null) {
        this._current = this._current.next;
        return this._current.value;
    }

    if (this._current.next === null && cycle) {
        this._current = this._first;
        return this._current.value;
    }

    return this._current.value;
};

LinkedList.prototype.prev = function (cycle) {
    if (this._current.prev !== null) {
        this._current = this._current.prev;
        return this._current.value;
    }

    if (this._current.prev === null && cycle) {
        this._current = this._last;
        return this._current.value;
    }

    return this._current.value;
};

LinkedList.prototype.current = function () {
    return this._current.value;
};

LinkedList.prototype.reset = function () {
    return this._current = this._first;
};

module.exports = LinkedList;