///<reference path="../../../headers/common.d.ts" />
System.register(['app/core/utils/kbn'], function(exports_1) {
    var kbn_1;
    var AxesEditorCtrl;
    /** @ngInject **/
    function axesEditorComponent() {
        'use strict';
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'public/app/plugins/panel/graph/axes_editor.html',
            controller: AxesEditorCtrl,
        };
    }
    exports_1("axesEditorComponent", axesEditorComponent);
    return {
        setters:[
            function (kbn_1_1) {
                kbn_1 = kbn_1_1;
            }],
        execute: function() {
            AxesEditorCtrl = (function () {
                /** @ngInject **/
                function AxesEditorCtrl($scope, $q) {
                    this.$scope = $scope;
                    this.$q = $q;
                    this.panelCtrl = $scope.ctrl;
                    this.panel = this.panelCtrl.panel;
                    $scope.ctrl = this;
                    this.unitFormats = kbn_1.default.getUnitFormats();
                    this.logScales = {
                        'linear': 1,
                        'log (base 2)': 2,
                        'log (base 10)': 10,
                        'log (base 32)': 32,
                        'log (base 1024)': 1024
                    };
                    this.xAxisModes = {
                        'Time': 'time',
                        'Series': 'series',
                    };
                    this.xAxisStatOptions = [
                        { text: 'Avg', value: 'avg' },
                        { text: 'Min', value: 'min' },
                        { text: 'Max', value: 'min' },
                        { text: 'Total', value: 'total' },
                        { text: 'Count', value: 'count' },
                    ];
                    if (this.panel.xaxis.mode === 'custom') {
                        if (!this.panel.xaxis.name) {
                            this.panel.xaxis.name = 'specify field';
                        }
                    }
                }
                AxesEditorCtrl.prototype.setUnitFormat = function (axis, subItem) {
                    axis.format = subItem.value;
                    this.panelCtrl.render();
                };
                AxesEditorCtrl.prototype.render = function () {
                    this.panelCtrl.render();
                };
                AxesEditorCtrl.prototype.xAxisOptionChanged = function () {
                    if (!this.panel.xaxis.values || !this.panel.xaxis.values[0]) {
                        this.panelCtrl.processor.setPanelDefaultsForNewXAxisMode();
                    }
                    this.panelCtrl.onDataReceived(this.panelCtrl.dataList);
                };
                AxesEditorCtrl.prototype.getDataFieldNames = function (onlyNumbers) {
                    var props = this.panelCtrl.processor.getDataFieldNames(this.panelCtrl.dataList, onlyNumbers);
                    var items = props.map(function (prop) {
                        return { text: prop, value: prop };
                    });
                    return this.$q.when(items);
                };
                return AxesEditorCtrl;
            })();
            exports_1("AxesEditorCtrl", AxesEditorCtrl);
        }
    }
});
//# sourceMappingURL=axes_editor.js.map