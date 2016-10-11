///<reference path="../../../headers/common.d.ts" />
System.register(['./datasource', 'app/plugins/sdk'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var datasource_1, sdk_1;
    var GrafanaQueryCtrl, GrafanaAnnotationsQueryCtrl;
    return {
        setters:[
            function (datasource_1_1) {
                datasource_1 = datasource_1_1;
            },
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            }],
        execute: function() {
            GrafanaQueryCtrl = (function (_super) {
                __extends(GrafanaQueryCtrl, _super);
                function GrafanaQueryCtrl() {
                    _super.apply(this, arguments);
                }
                GrafanaQueryCtrl.templateUrl = 'partials/query.editor.html';
                return GrafanaQueryCtrl;
            })(sdk_1.QueryCtrl);
            GrafanaAnnotationsQueryCtrl = (function () {
                function GrafanaAnnotationsQueryCtrl() {
                    this.annotation.type = this.annotation.type || 'alert';
                    this.annotation.limit = this.annotation.limit || 100;
                }
                GrafanaAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';
                return GrafanaAnnotationsQueryCtrl;
            })();
            exports_1("GrafanaDatasource", datasource_1.GrafanaDatasource);
            exports_1("Datasource", datasource_1.GrafanaDatasource);
            exports_1("QueryCtrl", GrafanaQueryCtrl);
            exports_1("AnnotationsQueryCtrl", GrafanaAnnotationsQueryCtrl);
        }
    }
});
//# sourceMappingURL=module.js.map