///<reference path="../../headers/common.d.ts" />
System.register(['../../core/core_module'], function(exports_1) {
    var core_module_1;
    var AlertNotificationEditCtrl;
    return {
        setters:[
            function (core_module_1_1) {
                core_module_1 = core_module_1_1;
            }],
        execute: function() {
            AlertNotificationEditCtrl = (function () {
                /** @ngInject */
                function AlertNotificationEditCtrl($routeParams, backendSrv, $scope, $location) {
                    this.$routeParams = $routeParams;
                    this.backendSrv = backendSrv;
                    this.$scope = $scope;
                    this.$location = $location;
                    this.testSeverity = "critical";
                    if ($routeParams.id) {
                        this.loadNotification($routeParams.id);
                    }
                    else {
                        this.model = {
                            type: 'email',
                            settings: {
                                severityFilter: 'none'
                            },
                            isDefault: false
                        };
                    }
                }
                AlertNotificationEditCtrl.prototype.loadNotification = function (id) {
                    var _this = this;
                    this.backendSrv.get("/api/alert-notifications/" + id).then(function (result) {
                        _this.model = result;
                    });
                };
                AlertNotificationEditCtrl.prototype.isNew = function () {
                    return this.model.id === undefined;
                };
                AlertNotificationEditCtrl.prototype.save = function () {
                    var _this = this;
                    if (!this.theForm.$valid) {
                        return;
                    }
                    if (this.model.id) {
                        this.backendSrv.put("/api/alert-notifications/" + this.model.id, this.model).then(function (res) {
                            _this.model = res;
                            _this.$scope.appEvent('alert-success', ['Notification updated', '']);
                        });
                    }
                    else {
                        this.backendSrv.post("/api/alert-notifications", this.model).then(function (res) {
                            _this.$scope.appEvent('alert-success', ['Notification created', '']);
                            _this.$location.path('alerting/notifications');
                        });
                    }
                };
                AlertNotificationEditCtrl.prototype.typeChanged = function () {
                    this.model.settings = {};
                };
                AlertNotificationEditCtrl.prototype.testNotification = function () {
                    var _this = this;
                    if (!this.theForm.$valid) {
                        return;
                    }
                    var payload = {
                        name: this.model.name,
                        type: this.model.type,
                        settings: this.model.settings,
                    };
                    this.backendSrv.post("/api/alert-notifications/test", payload)
                        .then(function (res) {
                        _this.$scope.appEvent('alert-succes', ['Test notification sent', '']);
                    });
                };
                return AlertNotificationEditCtrl;
            })();
            exports_1("AlertNotificationEditCtrl", AlertNotificationEditCtrl);
            core_module_1.default.controller('AlertNotificationEditCtrl', AlertNotificationEditCtrl);
        }
    }
});
//# sourceMappingURL=notification_edit_ctrl.js.map