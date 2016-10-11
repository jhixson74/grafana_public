///<reference path="../../../headers/common.d.ts" />
System.register([], function(exports_1) {
    var ConfigCtrl;
    return {
        setters:[],
        execute: function() {
            ConfigCtrl = (function () {
                function ConfigCtrl(backendSrv) {
                    this.backendSrv = backendSrv;
                    this.appEditCtrl.setPreUpdateHook(this.initDatasource.bind(this));
                }
                ConfigCtrl.prototype.initDatasource = function () {
                    var _this = this;
                    return this.backendSrv.get('/api/datasources').then(function (res) {
                        var found = false;
                        for (var _i = 0; _i < res.length; _i++) {
                            var ds = res[_i];
                            if (ds.type === "grafana-testdata-datasource") {
                                found = true;
                            }
                        }
                        if (!found) {
                            var dsInstance = {
                                name: 'Grafana TestData',
                                type: 'grafana-testdata-datasource',
                                access: 'direct',
                                jsonData: {}
                            };
                            return _this.backendSrv.post('/api/datasources', dsInstance);
                        }
                        return Promise.resolve();
                    });
                };
                ConfigCtrl.template = '';
                return ConfigCtrl;
            })();
            exports_1("ConfigCtrl", ConfigCtrl);
        }
    }
});
//# sourceMappingURL=module.js.map