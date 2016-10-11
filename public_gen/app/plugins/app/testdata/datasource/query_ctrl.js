///<reference path="../../../../headers/common.d.ts" />
System.register(['lodash', 'app/plugins/sdk'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lodash_1, sdk_1;
    var TestDataQueryCtrl;
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            }],
        execute: function() {
            TestDataQueryCtrl = (function (_super) {
                __extends(TestDataQueryCtrl, _super);
                /** @ngInject **/
                function TestDataQueryCtrl($scope, $injector, backendSrv) {
                    _super.call(this, $scope, $injector);
                    this.backendSrv = backendSrv;
                    this.target.scenarioId = this.target.scenarioId || 'random_walk';
                    this.scenarioList = [];
                }
                TestDataQueryCtrl.prototype.$onInit = function () {
                    var _this = this;
                    return this.backendSrv.get('/api/tsdb/testdata/scenarios').then(function (res) {
                        _this.scenarioList = res;
                        _this.scenario = lodash_1.default.find(_this.scenarioList, { id: _this.target.scenarioId });
                    });
                };
                TestDataQueryCtrl.prototype.scenarioChanged = function () {
                    this.scenario = lodash_1.default.find(this.scenarioList, { id: this.target.scenarioId });
                    this.target.stringInput = this.scenario.stringInput;
                    this.refresh();
                };
                TestDataQueryCtrl.templateUrl = 'partials/query.editor.html';
                return TestDataQueryCtrl;
            })(sdk_1.QueryCtrl);
            exports_1("TestDataQueryCtrl", TestDataQueryCtrl);
        }
    }
});
//# sourceMappingURL=query_ctrl.js.map