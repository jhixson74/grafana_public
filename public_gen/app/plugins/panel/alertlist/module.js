///<reference path="../../../headers/common.d.ts" />
System.register(['lodash', 'moment', '../../../features/alerting/alert_def', 'app/plugins/sdk', 'app/core/utils/datemath'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var lodash_1, moment_1, alert_def_1, sdk_1, dateMath;
    var AlertListPanel;
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (moment_1_1) {
                moment_1 = moment_1_1;
            },
            function (alert_def_1_1) {
                alert_def_1 = alert_def_1_1;
            },
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (dateMath_1) {
                dateMath = dateMath_1;
            }],
        execute: function() {
            AlertListPanel = (function (_super) {
                __extends(AlertListPanel, _super);
                /** @ngInject */
                function AlertListPanel($scope, $injector, $location, backendSrv, timeSrv, templateSrv) {
                    _super.call(this, $scope, $injector);
                    this.$location = $location;
                    this.backendSrv = backendSrv;
                    this.timeSrv = timeSrv;
                    this.templateSrv = templateSrv;
                    this.showOptions = [
                        { text: 'Current state', value: 'current' },
                        { text: 'Recent state changes', value: 'changes' }
                    ];
                    this.stateFilter = {};
                    this.currentAlerts = [];
                    this.alertHistory = [];
                    // Set and populate defaults
                    this.panelDefaults = {
                        show: 'current',
                        limit: 10,
                        stateFilter: []
                    };
                    lodash_1.default.defaults(this.panel, this.panelDefaults);
                    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
                    this.events.on('render', this.onRender.bind(this));
                    this.events.on('refresh', this.onRender.bind(this));
                    for (var key in this.panel.stateFilter) {
                        this.stateFilter[this.panel.stateFilter[key]] = true;
                    }
                }
                AlertListPanel.prototype.updateStateFilter = function () {
                    var result = [];
                    for (var key in this.stateFilter) {
                        if (this.stateFilter[key]) {
                            result.push(key);
                        }
                    }
                    this.panel.stateFilter = result;
                    this.onRender();
                };
                AlertListPanel.prototype.onRender = function () {
                    if (this.panel.show === 'current') {
                        this.getCurrentAlertState();
                    }
                    if (this.panel.show === 'changes') {
                        this.getStateChanges();
                    }
                };
                AlertListPanel.prototype.getStateChanges = function () {
                    var _this = this;
                    var params = {
                        limit: this.panel.limit,
                        type: 'alert',
                        newState: this.panel.stateFilter
                    };
                    params.from = dateMath.parse(this.dashboard.time.from).unix() * 1000;
                    params.to = dateMath.parse(this.dashboard.time.to).unix() * 1000;
                    this.backendSrv.get("/api/annotations", params)
                        .then(function (res) {
                        _this.alertHistory = lodash_1.default.map(res, function (al) {
                            al.time = moment_1.default(al.time).format('MMM D, YYYY HH:mm:ss');
                            al.stateModel = alert_def_1.default.getStateDisplayModel(al.newState);
                            al.metrics = alert_def_1.default.joinEvalMatches(al.data, ', ');
                            return al;
                        });
                    });
                };
                AlertListPanel.prototype.getCurrentAlertState = function () {
                    var _this = this;
                    var params = {
                        state: this.panel.stateFilter
                    };
                    this.backendSrv.get("/api/alerts", params)
                        .then(function (res) {
                        _this.currentAlerts = lodash_1.default.map(res, function (al) {
                            al.stateModel = alert_def_1.default.getStateDisplayModel(al.state);
                            al.newStateDateAgo = moment_1.default(al.newStateDate).fromNow().replace(" ago", "");
                            return al;
                        });
                    });
                };
                AlertListPanel.prototype.onInitEditMode = function () {
                    this.addEditorTab('Options', 'public/app/plugins/panel/alertlist/editor.html');
                };
                AlertListPanel.templateUrl = 'module.html';
                return AlertListPanel;
            })(sdk_1.PanelCtrl);
            exports_1("AlertListPanel", AlertListPanel);
            exports_1("PanelCtrl", AlertListPanel);
        }
    }
});
//# sourceMappingURL=module.js.map