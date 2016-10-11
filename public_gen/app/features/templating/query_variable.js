///<reference path="../../headers/common.d.ts" />
System.register(['lodash', 'app/core/utils/kbn', './variable'], function(exports_1) {
    var lodash_1, kbn_1, variable_1;
    var QueryVariable;
    function getNoneOption() {
        return { text: 'None', value: '', isNone: true };
    }
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (kbn_1_1) {
                kbn_1 = kbn_1_1;
            },
            function (variable_1_1) {
                variable_1 = variable_1_1;
            }],
        execute: function() {
            QueryVariable = (function () {
                /** @ngInject **/
                function QueryVariable(model, datasourceSrv, templateSrv, variableSrv, $q) {
                    this.model = model;
                    this.datasourceSrv = datasourceSrv;
                    this.templateSrv = templateSrv;
                    this.variableSrv = variableSrv;
                    this.$q = $q;
                    this.defaults = {
                        type: 'query',
                        label: null,
                        query: '',
                        regex: '',
                        sort: 0,
                        datasource: null,
                        refresh: 0,
                        hide: 0,
                        name: '',
                        multi: false,
                        includeAll: false,
                        allValue: null,
                        options: [],
                        current: {},
                        tagsQuery: null,
                        tagValuesQuery: null,
                    };
                    // copy model properties to this instance
                    variable_1.assignModelProperties(this, model, this.defaults);
                }
                QueryVariable.prototype.getModel = function () {
                    // copy back model properties to model
                    variable_1.assignModelProperties(this.model, this, this.defaults);
                    return this.model;
                };
                QueryVariable.prototype.setValue = function (option) {
                    return this.variableSrv.setOptionAsCurrent(this, option);
                };
                QueryVariable.prototype.setValueFromUrl = function (urlValue) {
                    return this.variableSrv.setOptionFromUrl(this, urlValue);
                };
                QueryVariable.prototype.getValueForUrl = function () {
                    if (this.current.text === 'All') {
                        return 'All';
                    }
                    return this.current.value;
                };
                QueryVariable.prototype.updateOptions = function () {
                    return this.datasourceSrv.get(this.datasource)
                        .then(this.updateOptionsFromMetricFindQuery.bind(this))
                        .then(this.variableSrv.validateVariableSelectionState.bind(this.variableSrv, this));
                };
                QueryVariable.prototype.updateOptionsFromMetricFindQuery = function (datasource) {
                    var _this = this;
                    return datasource.metricFindQuery(this.query).then(function (results) {
                        _this.options = _this.metricNamesToVariableValues(results);
                        if (_this.includeAll) {
                            _this.addAllOption();
                        }
                        if (!_this.options.length) {
                            _this.options.push(getNoneOption());
                        }
                        return datasource;
                    });
                };
                QueryVariable.prototype.addAllOption = function () {
                    this.options.unshift({ text: 'All', value: "$__all" });
                };
                QueryVariable.prototype.metricNamesToVariableValues = function (metricNames) {
                    var regex, options, i, matches;
                    options = [];
                    if (this.regex) {
                        regex = kbn_1.default.stringToJsRegex(this.templateSrv.replace(this.regex));
                    }
                    for (i = 0; i < metricNames.length; i++) {
                        var item = metricNames[i];
                        var value = item.value || item.text;
                        var text = item.text || item.value;
                        if (lodash_1.default.isNumber(value)) {
                            value = value.toString();
                        }
                        if (lodash_1.default.isNumber(text)) {
                            text = text.toString();
                        }
                        if (regex) {
                            matches = regex.exec(value);
                            if (!matches) {
                                continue;
                            }
                            if (matches.length > 1) {
                                value = matches[1];
                                text = matches[1];
                            }
                        }
                        options.push({ text: text, value: value });
                    }
                    options = lodash_1.default.uniqBy(options, 'value');
                    return this.sortVariableValues(options, this.sort);
                };
                QueryVariable.prototype.sortVariableValues = function (options, sortOrder) {
                    if (sortOrder === 0) {
                        return options;
                    }
                    var sortType = Math.ceil(sortOrder / 2);
                    var reverseSort = (sortOrder % 2 === 0);
                    if (sortType === 1) {
                        options = lodash_1.default.sortBy(options, 'text');
                    }
                    else if (sortType === 2) {
                        options = lodash_1.default.sortBy(options, function (opt) {
                            var matches = opt.text.match(/.*?(\d+).*/);
                            if (!matches) {
                                return 0;
                            }
                            else {
                                return parseInt(matches[1], 10);
                            }
                        });
                    }
                    if (reverseSort) {
                        options = options.reverse();
                    }
                    return options;
                };
                QueryVariable.prototype.dependsOn = function (variable) {
                    return variable_1.containsVariable(this.query, this.datasource, variable.name);
                };
                return QueryVariable;
            })();
            exports_1("QueryVariable", QueryVariable);
            variable_1.variableTypes['query'] = {
                name: 'Query',
                ctor: QueryVariable,
                description: 'Variable values are fetched from a datasource query',
                supportsMulti: true,
            };
        }
    }
});
//# sourceMappingURL=query_variable.js.map