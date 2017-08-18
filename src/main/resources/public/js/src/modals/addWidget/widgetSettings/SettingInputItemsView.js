/*
 * Copyright 2016 EPAM Systems
 *
 *
 * This file is part of EPAM Report Portal.
 * https://github.com/epam/ReportPortal
 *
 * Report Portal is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Report Portal is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Report Portal.  If not, see <http://www.gnu.org/licenses/>.
 */

define(function (require) {
    'use strict';

    var Util = require('util');
    var Epoxy = require('backbone-epoxy');
    var $ = require('jquery');
    var _ = require('underscore');
    var SettingView = require('modals/addWidget/widgetSettings/_settingView');
    var Service = require('coreService');

    var actionTypes = {};

    var SettingInputItemsView = SettingView.extend({
        className: 'modal-add-widget-setting-input-items',
        template: 'modal-add-widget-setting-input-items',
        bindings: {
            '[data-js-label-name]': 'html:label',
            '[data-js-label-input]': 'value:value'
        },
        initialize: function (data) {
            var options = _.extend({
                label: '',
                inputPlaceholder: '',
                minItemLength: 3,
                maxItemLength: 256,
                minItems: 0,
                maxItems: 50,
                entity: '',
                value: ''
            }, data.options);
            this.gadgetModel = data.gadgetModel;
            this.options = data.options;
            this.model = new Epoxy.Model(options);
            this.render();
            if (options.action && actionTypes[options.action]) {
                this.setValue = actionTypes[options.action].setValue;
                this.getValue = actionTypes[options.action].getValue;
            }
            options.setValue && (this.setValue = options.setValue);
            options.getValue && (this.getValue = options.getValue);
            options.validate && (this.validate = options.validate.bind(this));
            this.model.set({ value: this.getValue(this.gadgetModel, this) });
            this.listenTo(this.model, 'change:value', this.onChangeValue);
        },
        render: function () {
            this.$el.html(Util.templates(this.template, {}));
        },
        getFunctions: function () {
            switch (this.model.get('entity')) {
            case 'filter':
                return {
                    query: function (query) {
                        Service.saveFilter('?page.sort=name&page.page=1&page.size=50&filter.cnt.name=' + query.term)
                            .done(function (response) {
                                var data = { results: [] };
                                _.each(response.content, function (item) {
                                    data.results.push({
                                        id: item.id,
                                        text: item.name
                                    });
                                });
                                query.callback(data);
                            })
                            .fail(function (error) {
                                Util.ajaxFailMessenger(error);
                            });
                    },
                    getDataByIds: function (values, callback) {
                        Service.getFilterData(values)
                            .done(function (data) {
                                callback(_.map(data, function (filter) {
                                    return { id: filter.id, text: filter.name };
                                }));
                            });
                    }
                };
            case 'launch':
                return function (query) {
                    Service.searchLaunches(query)
                        .done(function (response) {
                            var data = { results: [] };
                            _.each(response, function (item) {
                                data.results.push({
                                    id: item,
                                    text: item
                                });
                            });
                            query.callback(data);
                        })
                        .fail(function (error) {
                            Util.ajaxFailMessenger(error);
                        });
                };
            default:
                return function (query) {
                    query.callback([]);
                };
            }
        },
        activate: function () {
            var self = this;
            Util.setupSelect2WhithScroll($('[data-js-label-input]', this.$el), {
                min: this.model.get('minItems'),
                minimumInputLength: this.model.get('minItemLength'),
                maximumInputLength: this.model.get('maxItemLength'),
                maximumSelectionSize: this.model.get('maxItems'),
                multiple: (this.model.get('maxItems') >= 2),
                dropdownCssClass: 'rp-select2-separate-block',
                allowClear: false,
                placeholder: this.model.get('inputPlaceholder'),
                tags: true,
                initSelection: function (element, callback) {
                    self.getFunctions()
                        .getDataByIds(self.getValue(self.gadgetModel, self), callback);
                },
                query: this.getFunctions().query
            });
        },
        onChangeValue: function (model, value) {
            this.setValue(value.split(','), this.gadgetModel, this);
        },
        validate: function () {
            if (this.model.get('minItems') > 0 && this.model.get('value') === '') {
                return false;
            }
            return true;
        },
        onDestroy: function () {
            this.selectCriteria && this.selectCriteria.destroy();
        }
    });

    return SettingInputItemsView;
});