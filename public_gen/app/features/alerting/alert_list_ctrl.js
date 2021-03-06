///<reference path="../../headers/common.d.ts" />
System.register(['lodash', '../../core/core_module', '../../core/app_events', 'moment', './alert_def'], function(exports_1) {
    var lodash_1, core_module_1, app_events_1, moment_1, alert_def_1;
    var AlertListCtrl;
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (core_module_1_1) {
                core_module_1 = core_module_1_1;
            },
            function (app_events_1_1) {
                app_events_1 = app_events_1_1;
            },
            function (moment_1_1) {
                moment_1 = moment_1_1;
            },
            function (alert_def_1_1) {
                alert_def_1 = alert_def_1_1;
            }],
        execute: function() {
            AlertListCtrl = (function () {
                /** @ngInject */
                function AlertListCtrl(backendSrv, $location) {
                    this.backendSrv = backendSrv;
                    this.$location = $location;
                    this.stateFilters = [
                        { text: 'All', value: null },
                        { text: 'OK', value: 'ok' },
                        { text: 'Alerting', value: 'alerting' },
                        { text: 'No Data', value: 'no_data' },
                        { text: 'Execution Error', value: 'execution_error' },
                    ];
                    this.filters = {
                        state: 'ALL'
                    };
                    var params = $location.search();
                    this.filters.state = params.state || null;
                    this.loadAlerts();
                }
                AlertListCtrl.prototype.filtersChanged = function () {
                    this.$location.search(this.filters);
                };
                AlertListCtrl.prototype.loadAlerts = function () {
                    var _this = this;
                    this.backendSrv.get('/api/alerts', this.filters).then(function (result) {
                        _this.alerts = lodash_1.default.map(result, function (alert) {
                            alert.stateModel = alert_def_1.default.getStateDisplayModel(alert.state);
                            alert.newStateDateAgo = moment_1.default(alert.newStateDate).fromNow().replace(" ago", "");
                            return alert;
                        });
                    });
                };
                AlertListCtrl.prototype.openHowTo = function () {
                    app_events_1.default.emit('show-modal', {
                        src: 'public/app/features/alerting/partials/alert_howto.html',
                        modalClass: 'confirm-modal',
                        model: {}
                    });
                };
                return AlertListCtrl;
            })();
            exports_1("AlertListCtrl", AlertListCtrl);
            core_module_1.default.controller('AlertListCtrl', AlertListCtrl);
        }
    }
});
//# sourceMappingURL=alert_list_ctrl.js.map