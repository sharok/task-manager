"use strict"

var React = require('react'),
    SwitchButton = require('components/common/switch-button'),
    lz = require('localization').get(),
    quickAddStore = require('stores/quickTaskAddStore'),
    quickAddActions = require('actions/quickTaskAddActions'),
    QUICK_ADD_BLOCKS = require('constants/quickTaskAddBlocks'),
    mixins = require('mixins/main');

var SelectDate = React.createClass({
    mixins: mixins('dynamicStyle', 'bindToStore'),
    bindingStores: [quickAddStore],

    _handleClick: function () {
        quickAddActions.changeAdditionBlock(QUICK_ADD_BLOCKS.SELECT_DATE);
    },

    _handleSwitchChange: function (key) {
        switch (key) {
            case 'today':
                quickAddActions.setAdditionTaskForToday();
                break;
            case 'then':
                quickAddActions.setAdditionTaskForDate();
                break;
        }

        return true;
    },

    getInitialState: function () {
        return {
            display: quickAddStore.startedAdd(),
            taskForToday:quickAddStore.forToday(),
            active: quickAddStore.activeBlock() === QUICK_ADD_BLOCKS.SELECT_DATE
        }
    },

    render: function () {
        var buttons = {
            today: lz.TODAY,
            then: lz.THEN
        },
        className = this.cs({
            'task-select-date': true,
            'active': this.state.active,
            'hidden': !this.state.display
        });

        return (<div onClick={ this._handleClick } className={ className }>
            <SwitchButton
                onChange={ this._handleSwitchChange }
                buttons={ buttons }
                value={ this.state.taskForToday ? 'today' : 'then' } />
        </div>);
    }
});

module.exports = SelectDate;
