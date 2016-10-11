///<reference path="../../../../headers/common.d.ts" />
System.register(['../../../../../test/lib/common', 'moment', '../module', '../../../../../test/specs/helpers'], function(exports_1) {
    var common_1, moment_1, module_1, helpers_1;
    return {
        setters:[
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (moment_1_1) {
                moment_1 = moment_1_1;
            },
            function (module_1_1) {
                module_1 = module_1_1;
            },
            function (helpers_1_1) {
                helpers_1 = helpers_1_1;
            }],
        execute: function() {
            common_1.describe('GraphCtrl', function () {
                var ctx = new helpers_1.default.ControllerTestContext();
                common_1.beforeEach(common_1.angularMocks.module('grafana.services'));
                common_1.beforeEach(common_1.angularMocks.module('grafana.controllers'));
                common_1.beforeEach(ctx.providePhase());
                common_1.beforeEach(ctx.createPanelController(module_1.GraphCtrl));
                common_1.beforeEach(function () {
                    ctx.ctrl.annotationsPromise = Promise.resolve({});
                    ctx.ctrl.updateTimeRange();
                });
                common_1.describe('when time series are outside range', function () {
                    common_1.beforeEach(function () {
                        var data = [
                            { target: 'test.cpu1', datapoints: [[45, 1234567890], [60, 1234567899]] },
                        ];
                        ctx.ctrl.range = { from: moment_1.default().valueOf(), to: moment_1.default().valueOf() };
                        ctx.ctrl.onDataReceived(data);
                    });
                    common_1.it('should set datapointsOutside', function () {
                        common_1.expect(ctx.ctrl.datapointsOutside).to.be(true);
                    });
                });
                common_1.describe('when time series are inside range', function () {
                    common_1.beforeEach(function () {
                        var range = {
                            from: moment_1.default().subtract(1, 'days').valueOf(),
                            to: moment_1.default().valueOf()
                        };
                        var data = [
                            { target: 'test.cpu1', datapoints: [[45, range.from + 1000], [60, range.from + 10000]] },
                        ];
                        ctx.ctrl.range = range;
                        ctx.ctrl.onDataReceived(data);
                    });
                    common_1.it('should set datapointsOutside', function () {
                        common_1.expect(ctx.ctrl.datapointsOutside).to.be(false);
                    });
                });
                common_1.describe('datapointsCount given 2 series', function () {
                    common_1.beforeEach(function () {
                        var data = [
                            { target: 'test.cpu1', datapoints: [[45, 1234567890], [60, 1234567899]] },
                            { target: 'test.cpu2', datapoints: [[45, 1234567890]] },
                        ];
                        ctx.ctrl.onDataReceived(data);
                    });
                    common_1.it('should set datapointsCount to sum of datapoints', function () {
                        common_1.expect(ctx.ctrl.datapointsCount).to.be(3);
                    });
                });
            });
        }
    }
});
//# sourceMappingURL=graph_ctrl_specs.js.map