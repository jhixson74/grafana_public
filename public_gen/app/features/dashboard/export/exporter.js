///<reference path="../../../headers/common.d.ts" />
System.register(['app/core/config', 'lodash', '../dynamic_dashboard_srv'], function(exports_1) {
    var config_1, lodash_1, dynamic_dashboard_srv_1;
    var DashboardExporter;
    return {
        setters:[
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (dynamic_dashboard_srv_1_1) {
                dynamic_dashboard_srv_1 = dynamic_dashboard_srv_1_1;
            }],
        execute: function() {
            DashboardExporter = (function () {
                function DashboardExporter(datasourceSrv) {
                    this.datasourceSrv = datasourceSrv;
                }
                DashboardExporter.prototype.makeExportable = function (dash) {
                    var _this = this;
                    var dynSrv = new dynamic_dashboard_srv_1.DynamicDashboardSrv();
                    dynSrv.process(dash, { cleanUpOnly: true });
                    dash.id = null;
                    var inputs = [];
                    var requires = {};
                    var datasources = {};
                    var promises = [];
                    var templateizeDatasourceUsage = function (obj) {
                        promises.push(_this.datasourceSrv.get(obj.datasource).then(function (ds) {
                            if (ds.meta.builtIn) {
                                return;
                            }
                            var refName = 'DS_' + ds.name.replace(' ', '_').toUpperCase();
                            datasources[refName] = {
                                name: refName,
                                label: ds.name,
                                description: '',
                                type: 'datasource',
                                pluginId: ds.meta.id,
                                pluginName: ds.meta.name,
                            };
                            obj.datasource = '${' + refName + '}';
                            requires['datasource' + ds.meta.id] = {
                                type: 'datasource',
                                id: ds.meta.id,
                                name: ds.meta.name,
                                version: ds.meta.info.version || "1.0.0",
                            };
                        }));
                    };
                    // check up panel data sources
                    for (var _i = 0, _a = dash.rows; _i < _a.length; _i++) {
                        var row = _a[_i];
                        for (var _b = 0, _c = row.panels; _b < _c.length; _b++) {
                            var panel = _c[_b];
                            if (panel.datasource !== undefined) {
                                templateizeDatasourceUsage(panel);
                            }
                            if (panel.targets) {
                                for (var _d = 0, _e = panel.targets; _d < _e.length; _d++) {
                                    var target = _e[_d];
                                    if (target.datasource !== undefined) {
                                        templateizeDatasourceUsage(target);
                                    }
                                }
                            }
                            var panelDef = config_1.default.panels[panel.type];
                            if (panelDef) {
                                requires['panel' + panelDef.id] = {
                                    type: 'panel',
                                    id: panelDef.id,
                                    name: panelDef.name,
                                    version: panelDef.info.version,
                                };
                            }
                        }
                    }
                    // templatize template vars
                    for (var _f = 0, _g = dash.templating.list; _f < _g.length; _f++) {
                        var variable = _g[_f];
                        if (variable.type === 'query') {
                            templateizeDatasourceUsage(variable);
                            variable.options = [];
                            variable.current = {};
                            variable.refresh = 1;
                        }
                    }
                    // templatize annotations vars
                    for (var _h = 0, _j = dash.annotations.list; _h < _j.length; _h++) {
                        var annotationDef = _j[_h];
                        templateizeDatasourceUsage(annotationDef);
                    }
                    // add grafana version
                    requires['grafana'] = {
                        type: 'grafana',
                        id: 'grafana',
                        name: 'Grafana',
                        version: config_1.default.buildInfo.version
                    };
                    return Promise.all(promises).then(function () {
                        lodash_1.default.each(datasources, function (value, key) {
                            inputs.push(value);
                        });
                        // templatize constants
                        for (var _i = 0, _a = dash.templating.list; _i < _a.length; _i++) {
                            var variable = _a[_i];
                            if (variable.type === 'constant') {
                                var refName = 'VAR_' + variable.name.replace(' ', '_').toUpperCase();
                                inputs.push({
                                    name: refName,
                                    type: 'constant',
                                    label: variable.label || variable.name,
                                    value: variable.current.value,
                                    description: '',
                                });
                                // update current and option
                                variable.query = '${' + refName + '}';
                                variable.options[0] = variable.current = {
                                    value: variable.query,
                                    text: variable.query,
                                };
                            }
                        }
                        requires = lodash_1.default.map(requires, function (req) {
                            return req;
                        });
                        // make inputs and requires a top thing
                        var newObj = {};
                        newObj["__inputs"] = inputs;
                        newObj["__requires"] = requires;
                        lodash_1.default.defaults(newObj, dash);
                        return newObj;
                    }).catch(function (err) {
                        console.log('Export failed:', err);
                        return {
                            error: err
                        };
                    });
                };
                return DashboardExporter;
            })();
            exports_1("DashboardExporter", DashboardExporter);
        }
    }
});
//# sourceMappingURL=exporter.js.map