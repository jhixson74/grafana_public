///<reference path="../../headers/common.d.ts" />
System.register(['app/core/utils/kbn', './variable'], function(exports_1) {
    var kbn_1, variable_1;
    var DatasourceVariable;
    return {
        setters:[
            function (kbn_1_1) {
                kbn_1 = kbn_1_1;
            },
            function (variable_1_1) {
                variable_1 = variable_1_1;
            }],
        execute: function() {
            DatasourceVariable = (function () {
                /** @ngInject **/
                function DatasourceVariable(model, datasourceSrv, variableSrv) {
                    this.model = model;
                    this.datasourceSrv = datasourceSrv;
                    this.variableSrv = variableSrv;
                    this.defaults = {
                        type: 'datasource',
                        name: '',
                        hide: 0,
                        label: '',
                        current: {},
                        regex: '',
                        options: [],
                        query: '',
                        refresh: 1,
                    };
                    variable_1.assignModelProperties(this, model, this.defaults);
                    this.refresh = 1;
                }
                DatasourceVariable.prototype.getModel = function () {
                    variable_1.assignModelProperties(this.model, this, this.defaults);
                    return this.model;
                };
                DatasourceVariable.prototype.setValue = function (option) {
                    return this.variableSrv.setOptionAsCurrent(this, option);
                };
                DatasourceVariable.prototype.updateOptions = function () {
                    var options = [];
                    var sources = this.datasourceSrv.getMetricSources({ skipVariables: true });
                    var regex;
                    if (this.regex) {
                        regex = kbn_1.default.stringToJsRegex(this.regex);
                    }
                    for (var i = 0; i < sources.length; i++) {
                        var source = sources[i];
                        // must match on type
                        if (source.meta.id !== this.query) {
                            continue;
                        }
                        if (regex && !regex.exec(source.name)) {
                            continue;
                        }
                        options.push({ text: source.name, value: source.name });
                    }
                    if (options.length === 0) {
                        options.push({ text: 'No data sources found', value: '' });
                    }
                    this.options = options;
                    return this.variableSrv.validateVariableSelectionState(this);
                };
                DatasourceVariable.prototype.dependsOn = function (variable) {
                    return false;
                };
                DatasourceVariable.prototype.setValueFromUrl = function (urlValue) {
                    return this.variableSrv.setOptionFromUrl(this, urlValue);
                };
                DatasourceVariable.prototype.getValueForUrl = function () {
                    return this.current.value;
                };
                return DatasourceVariable;
            })();
            exports_1("DatasourceVariable", DatasourceVariable);
            variable_1.variableTypes['datasource'] = {
                name: 'Datasource',
                ctor: DatasourceVariable,
                description: 'Enabled you to dynamically switch the datasource for multiple panels',
            };
        }
    }
});
//# sourceMappingURL=datasource_variable.js.map