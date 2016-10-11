///<reference path="../../headers/common.d.ts" />
System.register(['angular', 'moment', 'lodash', 'jquery', 'app/core/core', 'app/core/services/context_srv', 'app/core/core_module'], function(exports_1) {
    var angular_1, moment_1, lodash_1, jquery_1, core_1, context_srv_1, core_module_1;
    var DashboardModel, DashboardSrv;
    return {
        setters:[
            function (angular_1_1) {
                angular_1 = angular_1_1;
            },
            function (moment_1_1) {
                moment_1 = moment_1_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (context_srv_1_1) {
                context_srv_1 = context_srv_1_1;
            },
            function (core_module_1_1) {
                core_module_1 = core_module_1_1;
            }],
        execute: function() {
            DashboardModel = (function () {
                function DashboardModel(data, meta) {
                    if (!data) {
                        data = {};
                    }
                    this.events = new core_1.Emitter();
                    this.id = data.id || null;
                    this.revision = data.revision;
                    this.title = data.title || 'No Title';
                    this.autoUpdate = data.autoUpdate;
                    this.description = data.description;
                    this.tags = data.tags || [];
                    this.style = data.style || "dark";
                    this.timezone = data.timezone || '';
                    this.editable = data.editable !== false;
                    this.hideControls = data.hideControls || false;
                    this.sharedCrosshair = data.sharedCrosshair || false;
                    this.rows = data.rows || [];
                    this.time = data.time || { from: 'now-6h', to: 'now' };
                    this.timepicker = data.timepicker || {};
                    this.templating = this.ensureListExist(data.templating);
                    this.annotations = this.ensureListExist(data.annotations);
                    this.refresh = data.refresh;
                    this.snapshot = data.snapshot;
                    this.schemaVersion = data.schemaVersion || 0;
                    this.version = data.version || 0;
                    this.links = data.links || [];
                    this.gnetId = data.gnetId || null;
                    this.updateSchema(data);
                    this.initMeta(meta);
                }
                DashboardModel.prototype.initMeta = function (meta) {
                    meta = meta || {};
                    meta.canShare = meta.canShare !== false;
                    meta.canSave = meta.canSave !== false;
                    meta.canStar = meta.canStar !== false;
                    meta.canEdit = meta.canEdit !== false;
                    if (!this.editable) {
                        meta.canEdit = false;
                        meta.canDelete = false;
                        meta.canSave = false;
                        this.hideControls = true;
                    }
                    this.meta = meta;
                };
                // cleans meta data and other non peristent state
                DashboardModel.prototype.getSaveModelClone = function () {
                    // temp remove stuff
                    var events = this.events;
                    var meta = this.meta;
                    delete this.events;
                    delete this.meta;
                    events.emit('prepare-save-model');
                    var copy = jquery_1.default.extend(true, {}, this);
                    // restore properties
                    this.events = events;
                    this.meta = meta;
                    return copy;
                };
                DashboardModel.prototype.ensureListExist = function (data) {
                    if (!data) {
                        data = {};
                    }
                    if (!data.list) {
                        data.list = [];
                    }
                    return data;
                };
                DashboardModel.prototype.getNextPanelId = function () {
                    var i, j, row, panel, max = 0;
                    for (i = 0; i < this.rows.length; i++) {
                        row = this.rows[i];
                        for (j = 0; j < row.panels.length; j++) {
                            panel = row.panels[j];
                            if (panel.id > max) {
                                max = panel.id;
                            }
                        }
                    }
                    return max + 1;
                };
                DashboardModel.prototype.forEachPanel = function (callback) {
                    var i, j, row;
                    for (i = 0; i < this.rows.length; i++) {
                        row = this.rows[i];
                        for (j = 0; j < row.panels.length; j++) {
                            callback(row.panels[j], j, row, i);
                        }
                    }
                };
                DashboardModel.prototype.getPanelById = function (id) {
                    for (var i = 0; i < this.rows.length; i++) {
                        var row = this.rows[i];
                        for (var j = 0; j < row.panels.length; j++) {
                            var panel = row.panels[j];
                            if (panel.id === id) {
                                return panel;
                            }
                        }
                    }
                    return null;
                };
                DashboardModel.prototype.rowSpan = function (row) {
                    return lodash_1.default.reduce(row.panels, function (p, v) {
                        return p + v.span;
                    }, 0);
                };
                ;
                DashboardModel.prototype.addPanel = function (panel, row) {
                    var rowSpan = this.rowSpan(row);
                    var panelCount = row.panels.length;
                    var space = (12 - rowSpan) - panel.span;
                    panel.id = this.getNextPanelId();
                    // try to make room of there is no space left
                    if (space <= 0) {
                        if (panelCount === 1) {
                            row.panels[0].span = 6;
                            panel.span = 6;
                        }
                        else if (panelCount === 2) {
                            row.panels[0].span = 4;
                            row.panels[1].span = 4;
                            panel.span = 4;
                        }
                    }
                    row.panels.push(panel);
                };
                DashboardModel.prototype.isSubmenuFeaturesEnabled = function () {
                    var visableTemplates = lodash_1.default.filter(this.templating.list, function (template) {
                        return template.hideVariable === undefined || template.hideVariable === false;
                    });
                    return visableTemplates.length > 0 || this.annotations.list.length > 0 || this.links.length > 0;
                };
                DashboardModel.prototype.getPanelInfoById = function (panelId) {
                    var result = {};
                    lodash_1.default.each(this.rows, function (row) {
                        lodash_1.default.each(row.panels, function (panel, index) {
                            if (panel.id === panelId) {
                                result.panel = panel;
                                result.row = row;
                                result.index = index;
                            }
                        });
                    });
                    if (!result.panel) {
                        return null;
                    }
                    return result;
                };
                DashboardModel.prototype.duplicatePanel = function (panel, row) {
                    var rowIndex = lodash_1.default.indexOf(this.rows, row);
                    var newPanel = angular_1.default.copy(panel);
                    newPanel.id = this.getNextPanelId();
                    delete newPanel.repeat;
                    delete newPanel.repeatIteration;
                    delete newPanel.repeatPanelId;
                    delete newPanel.scopedVars;
                    var currentRow = this.rows[rowIndex];
                    currentRow.panels.push(newPanel);
                    return newPanel;
                };
                DashboardModel.prototype.formatDate = function (date, format) {
                    date = moment_1.default.isMoment(date) ? date : moment_1.default(date);
                    format = format || 'YYYY-MM-DD HH:mm:ss';
                    this.timezone = this.getTimezone();
                    return this.timezone === 'browser' ?
                        moment_1.default(date).format(format) :
                        moment_1.default.utc(date).format(format);
                };
                DashboardModel.prototype.getRelativeTime = function (date) {
                    date = moment_1.default.isMoment(date) ? date : moment_1.default(date);
                    return this.timezone === 'browser' ?
                        moment_1.default(date).fromNow() :
                        moment_1.default.utc(date).fromNow();
                };
                DashboardModel.prototype.getNextQueryLetter = function (panel) {
                    var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    return lodash_1.default.find(letters, function (refId) {
                        return lodash_1.default.every(panel.targets, function (other) {
                            return other.refId !== refId;
                        });
                    });
                };
                DashboardModel.prototype.isTimezoneUtc = function () {
                    return this.getTimezone() === 'utc';
                };
                DashboardModel.prototype.getTimezone = function () {
                    return this.timezone ? this.timezone : context_srv_1.contextSrv.user.timezone;
                };
                DashboardModel.prototype.updateSchema = function (old) {
                    var i, j, k;
                    var oldVersion = this.schemaVersion;
                    var panelUpgrades = [];
                    this.schemaVersion = 13;
                    if (oldVersion === this.schemaVersion) {
                        return;
                    }
                    // version 2 schema changes
                    if (oldVersion < 2) {
                        if (old.services) {
                            if (old.services.filter) {
                                this.time = old.services.filter.time;
                                this.templating.list = old.services.filter.list || [];
                            }
                        }
                        panelUpgrades.push(function (panel) {
                            // rename panel type
                            if (panel.type === 'graphite') {
                                panel.type = 'graph';
                            }
                            if (panel.type !== 'graph') {
                                return;
                            }
                            if (lodash_1.default.isBoolean(panel.legend)) {
                                panel.legend = { show: panel.legend };
                            }
                            if (panel.grid) {
                                if (panel.grid.min) {
                                    panel.grid.leftMin = panel.grid.min;
                                    delete panel.grid.min;
                                }
                                if (panel.grid.max) {
                                    panel.grid.leftMax = panel.grid.max;
                                    delete panel.grid.max;
                                }
                            }
                            if (panel.y_format) {
                                panel.y_formats[0] = panel.y_format;
                                delete panel.y_format;
                            }
                            if (panel.y2_format) {
                                panel.y_formats[1] = panel.y2_format;
                                delete panel.y2_format;
                            }
                        });
                    }
                    // schema version 3 changes
                    if (oldVersion < 3) {
                        // ensure panel ids
                        var maxId = this.getNextPanelId();
                        panelUpgrades.push(function (panel) {
                            if (!panel.id) {
                                panel.id = maxId;
                                maxId += 1;
                            }
                        });
                    }
                    // schema version 4 changes
                    if (oldVersion < 4) {
                        // move aliasYAxis changes
                        panelUpgrades.push(function (panel) {
                            if (panel.type !== 'graph') {
                                return;
                            }
                            lodash_1.default.each(panel.aliasYAxis, function (value, key) {
                                panel.seriesOverrides = [{ alias: key, yaxis: value }];
                            });
                            delete panel.aliasYAxis;
                        });
                    }
                    if (oldVersion < 6) {
                        // move pulldowns to new schema
                        var annotations = lodash_1.default.find(old.pulldowns, { type: 'annotations' });
                        if (annotations) {
                            this.annotations = {
                                list: annotations.annotations || [],
                            };
                        }
                        // update template variables
                        for (i = 0; i < this.templating.list.length; i++) {
                            var variable = this.templating.list[i];
                            if (variable.datasource === void 0) {
                                variable.datasource = null;
                            }
                            if (variable.type === 'filter') {
                                variable.type = 'query';
                            }
                            if (variable.type === void 0) {
                                variable.type = 'query';
                            }
                            if (variable.allFormat === void 0) {
                                variable.allFormat = 'glob';
                            }
                        }
                    }
                    if (oldVersion < 7) {
                        if (old.nav && old.nav.length) {
                            this.timepicker = old.nav[0];
                        }
                        // ensure query refIds
                        panelUpgrades.push(function (panel) {
                            lodash_1.default.each(panel.targets, function (target) {
                                if (!target.refId) {
                                    target.refId = this.getNextQueryLetter(panel);
                                }
                            }.bind(this));
                        });
                    }
                    if (oldVersion < 8) {
                        panelUpgrades.push(function (panel) {
                            lodash_1.default.each(panel.targets, function (target) {
                                // update old influxdb query schema
                                if (target.fields && target.tags && target.groupBy) {
                                    if (target.rawQuery) {
                                        delete target.fields;
                                        delete target.fill;
                                    }
                                    else {
                                        target.select = lodash_1.default.map(target.fields, function (field) {
                                            var parts = [];
                                            parts.push({ type: 'field', params: [field.name] });
                                            parts.push({ type: field.func, params: [] });
                                            if (field.mathExpr) {
                                                parts.push({ type: 'math', params: [field.mathExpr] });
                                            }
                                            if (field.asExpr) {
                                                parts.push({ type: 'alias', params: [field.asExpr] });
                                            }
                                            return parts;
                                        });
                                        delete target.fields;
                                        lodash_1.default.each(target.groupBy, function (part) {
                                            if (part.type === 'time' && part.interval) {
                                                part.params = [part.interval];
                                                delete part.interval;
                                            }
                                            if (part.type === 'tag' && part.key) {
                                                part.params = [part.key];
                                                delete part.key;
                                            }
                                        });
                                        if (target.fill) {
                                            target.groupBy.push({ type: 'fill', params: [target.fill] });
                                            delete target.fill;
                                        }
                                    }
                                }
                            });
                        });
                    }
                    // schema version 9 changes
                    if (oldVersion < 9) {
                        // move aliasYAxis changes
                        panelUpgrades.push(function (panel) {
                            if (panel.type !== 'singlestat' && panel.thresholds !== "") {
                                return;
                            }
                            if (panel.thresholds) {
                                var k = panel.thresholds.split(",");
                                if (k.length >= 3) {
                                    k.shift();
                                    panel.thresholds = k.join(",");
                                }
                            }
                        });
                    }
                    // schema version 10 changes
                    if (oldVersion < 10) {
                        // move aliasYAxis changes
                        panelUpgrades.push(function (panel) {
                            if (panel.type !== 'table') {
                                return;
                            }
                            lodash_1.default.each(panel.styles, function (style) {
                                if (style.thresholds && style.thresholds.length >= 3) {
                                    var k = style.thresholds;
                                    k.shift();
                                    style.thresholds = k;
                                }
                            });
                        });
                    }
                    if (oldVersion < 12) {
                        // update template variables
                        lodash_1.default.each(this.templating.list, function (templateVariable) {
                            if (templateVariable.refresh) {
                                templateVariable.refresh = 1;
                            }
                            if (!templateVariable.refresh) {
                                templateVariable.refresh = 0;
                            }
                            if (templateVariable.hideVariable) {
                                templateVariable.hide = 2;
                            }
                            else if (templateVariable.hideLabel) {
                                templateVariable.hide = 1;
                            }
                            else {
                                templateVariable.hide = 0;
                            }
                        });
                    }
                    if (oldVersion < 12) {
                        // update graph yaxes changes
                        panelUpgrades.push(function (panel) {
                            if (panel.type !== 'graph') {
                                return;
                            }
                            if (!panel.grid) {
                                return;
                            }
                            if (!panel.yaxes) {
                                panel.yaxes = [
                                    {
                                        show: panel['y-axis'],
                                        min: panel.grid.leftMin,
                                        max: panel.grid.leftMax,
                                        logBase: panel.grid.leftLogBase,
                                        format: panel.y_formats[0],
                                        label: panel.leftYAxisLabel,
                                    },
                                    {
                                        show: panel['y-axis'],
                                        min: panel.grid.rightMin,
                                        max: panel.grid.rightMax,
                                        logBase: panel.grid.rightLogBase,
                                        format: panel.y_formats[1],
                                        label: panel.rightYAxisLabel,
                                    }
                                ];
                                panel.xaxis = {
                                    show: panel['x-axis'],
                                };
                                delete panel.grid.leftMin;
                                delete panel.grid.leftMax;
                                delete panel.grid.leftLogBase;
                                delete panel.grid.rightMin;
                                delete panel.grid.rightMax;
                                delete panel.grid.rightLogBase;
                                delete panel.y_formats;
                                delete panel.leftYAxisLabel;
                                delete panel.rightYAxisLabel;
                                delete panel['y-axis'];
                                delete panel['x-axis'];
                            }
                        });
                    }
                    if (oldVersion < 13) {
                        // update graph yaxes changes
                        panelUpgrades.push(function (panel) {
                            if (panel.type !== 'graph') {
                                return;
                            }
                            panel.thresholds = [];
                            var t1 = {}, t2 = {};
                            if (panel.grid.threshold1 !== null) {
                                t1.value = panel.grid.threshold1;
                                if (panel.grid.thresholdLine) {
                                    t1.line = true;
                                    t1.lineColor = panel.grid.threshold1Color;
                                }
                                else {
                                    t1.fill = true;
                                    t1.fillColor = panel.grid.threshold1Color;
                                }
                            }
                            if (panel.grid.threshold2 !== null) {
                                t2.value = panel.grid.threshold2;
                                if (panel.grid.thresholdLine) {
                                    t2.line = true;
                                    t2.lineColor = panel.grid.threshold2Color;
                                }
                                else {
                                    t2.fill = true;
                                    t2.fillColor = panel.grid.threshold2Color;
                                }
                            }
                            if (lodash_1.default.isNumber(t1.value)) {
                                if (lodash_1.default.isNumber(t2.value)) {
                                    if (t1.value > t2.value) {
                                        t1.op = t2.op = '<';
                                        panel.thresholds.push(t2);
                                        panel.thresholds.push(t1);
                                    }
                                    else {
                                        t1.op = t2.op = '>';
                                        panel.thresholds.push(t2);
                                        panel.thresholds.push(t1);
                                    }
                                }
                                else {
                                    t1.op = '>';
                                    panel.thresholds.push(t1);
                                }
                            }
                            delete panel.grid.threshold1;
                            delete panel.grid.threshold1Color;
                            delete panel.grid.threshold2;
                            delete panel.grid.threshold2Color;
                            delete panel.grid.thresholdLine;
                        });
                    }
                    if (panelUpgrades.length === 0) {
                        return;
                    }
                    for (i = 0; i < this.rows.length; i++) {
                        var row = this.rows[i];
                        for (j = 0; j < row.panels.length; j++) {
                            for (k = 0; k < panelUpgrades.length; k++) {
                                panelUpgrades[k].call(this, row.panels[j]);
                            }
                        }
                    }
                };
                return DashboardModel;
            })();
            exports_1("DashboardModel", DashboardModel);
            DashboardSrv = (function () {
                function DashboardSrv() {
                }
                DashboardSrv.prototype.create = function (dashboard, meta) {
                    return new DashboardModel(dashboard, meta);
                };
                DashboardSrv.prototype.setCurrent = function (dashboard) {
                    this.currentDashboard = dashboard;
                };
                DashboardSrv.prototype.getCurrent = function () {
                    return this.currentDashboard;
                };
                return DashboardSrv;
            })();
            exports_1("DashboardSrv", DashboardSrv);
            core_module_1.default.service('dashboardSrv', DashboardSrv);
        }
    }
});
//# sourceMappingURL=dashboard_srv.js.map