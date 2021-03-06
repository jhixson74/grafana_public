///<reference path="../../headers/common.d.ts" />
System.register(['angular', 'lodash', 'jquery', 'app/core/core_module'], function(exports_1) {
    var angular_1, lodash_1, jquery_1, core_module_1;
    var AnnotationsEditorCtrl;
    return {
        setters:[
            function (angular_1_1) {
                angular_1 = angular_1_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (core_module_1_1) {
                core_module_1 = core_module_1_1;
            }],
        execute: function() {
            AnnotationsEditorCtrl = (function () {
                /** @ngInject */
                function AnnotationsEditorCtrl($scope, datasourceSrv) {
                    var _this = this;
                    this.$scope = $scope;
                    this.datasourceSrv = datasourceSrv;
                    this.annotationDefaults = {
                        name: '',
                        datasource: null,
                        iconColor: 'rgba(255, 96, 96, 1)',
                        enable: true
                    };
                    $scope.ctrl = this;
                    this.mode = 'list';
                    this.datasources = datasourceSrv.getAnnotationSources();
                    this.annotations = $scope.dashboard.annotations.list;
                    this.reset();
                    $scope.$watch('mode', function (newVal) {
                        if (newVal === 'new') {
                            _this.reset();
                        }
                    });
                }
                AnnotationsEditorCtrl.prototype.datasourceChanged = function () {
                    var _this = this;
                    return this.datasourceSrv.get(this.currentAnnotation.datasource).then(function (ds) {
                        _this.currentDatasource = ds;
                    });
                };
                AnnotationsEditorCtrl.prototype.edit = function (annotation) {
                    this.currentAnnotation = annotation;
                    this.currentIsNew = false;
                    this.datasourceChanged();
                    this.mode = 'edit';
                    jquery_1.default(".tooltip.in").remove();
                };
                AnnotationsEditorCtrl.prototype.reset = function () {
                    this.currentAnnotation = angular_1.default.copy(this.annotationDefaults);
                    this.currentAnnotation.datasource = this.datasources[0].name;
                    this.currentIsNew = true;
                    this.datasourceChanged();
                };
                AnnotationsEditorCtrl.prototype.update = function () {
                    this.reset();
                    this.mode = 'list';
                    this.$scope.broadcastRefresh();
                };
                ;
                AnnotationsEditorCtrl.prototype.add = function () {
                    this.annotations.push(this.currentAnnotation);
                    this.reset();
                    this.mode = 'list';
                    this.$scope.updateSubmenuVisibility();
                    this.$scope.broadcastRefresh();
                };
                ;
                AnnotationsEditorCtrl.prototype.removeAnnotation = function (annotation) {
                    var index = lodash_1.default.indexOf(this.annotations, annotation);
                    this.annotations.splice(index, 1);
                    this.$scope.updateSubmenuVisibility();
                    this.$scope.broadcastRefresh();
                };
                return AnnotationsEditorCtrl;
            })();
            exports_1("AnnotationsEditorCtrl", AnnotationsEditorCtrl);
            core_module_1.default.controller('AnnotationsEditorCtrl', AnnotationsEditorCtrl);
        }
    }
});
//# sourceMappingURL=editor_ctrl.js.map