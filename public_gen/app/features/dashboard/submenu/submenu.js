///<reference path="../../../headers/common.d.ts" />
System.register(['angular'], function(exports_1) {
    var angular_1;
    var SubmenuCtrl;
    function submenuDirective() {
        return {
            restrict: 'E',
            templateUrl: 'public/app/features/dashboard/submenu/submenu.html',
            controller: SubmenuCtrl,
            bindToController: true,
            controllerAs: 'ctrl',
            scope: {
                dashboard: "=",
            }
        };
    }
    exports_1("submenuDirective", submenuDirective);
    return {
        setters:[
            function (angular_1_1) {
                angular_1 = angular_1_1;
            }],
        execute: function() {
            SubmenuCtrl = (function () {
                /** @ngInject */
                function SubmenuCtrl($rootScope, variableSrv, templateSrv, $location) {
                    this.$rootScope = $rootScope;
                    this.variableSrv = variableSrv;
                    this.templateSrv = templateSrv;
                    this.$location = $location;
                    this.annotations = this.dashboard.templating.list;
                    this.variables = this.variableSrv.variables;
                }
                SubmenuCtrl.prototype.annotationStateChanged = function () {
                    this.$rootScope.$broadcast('refresh');
                };
                SubmenuCtrl.prototype.getValuesForTag = function (variable, tagKey) {
                    return this.variableSrv.getValuesForTag(variable, tagKey);
                };
                SubmenuCtrl.prototype.variableUpdated = function (variable) {
                    var _this = this;
                    this.variableSrv.variableUpdated(variable).then(function () {
                        _this.$rootScope.$emit('template-variable-value-updated');
                        _this.$rootScope.$broadcast('refresh');
                    });
                };
                return SubmenuCtrl;
            })();
            exports_1("SubmenuCtrl", SubmenuCtrl);
            angular_1.default.module('grafana.directives').directive('dashboardSubmenu', submenuDirective);
        }
    }
});
//# sourceMappingURL=submenu.js.map