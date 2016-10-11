System.register(['test/lib/common', '../variable'], function(exports_1) {
    var common_1, variable_1;
    return {
        setters:[
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (variable_1_1) {
                variable_1 = variable_1_1;
            }],
        execute: function() {
            common_1.describe('containsVariable', function () {
                common_1.describe('when checking if a string contains a variable', function () {
                    common_1.it('should find it with $var syntax', function () {
                        var contains = variable_1.containsVariable('this.$test.filters', 'test');
                        common_1.expect(contains).to.be(true);
                    });
                    common_1.it('should not find it if only part matches with $var syntax', function () {
                        var contains = variable_1.containsVariable('this.$ServerDomain.filters', 'Server');
                        common_1.expect(contains).to.be(false);
                    });
                    common_1.it('should find it with [[var]] syntax', function () {
                        var contains = variable_1.containsVariable('this.[[test]].filters', 'test');
                        common_1.expect(contains).to.be(true);
                    });
                    common_1.it('should find it when part of segment', function () {
                        var contains = variable_1.containsVariable('metrics.$env.$group-*', 'group');
                        common_1.expect(contains).to.be(true);
                    });
                    common_1.it('should find it its the only thing', function () {
                        var contains = variable_1.containsVariable('$env', 'env');
                        common_1.expect(contains).to.be(true);
                    });
                    common_1.it('should be able to pass in multiple test strings', function () {
                        var contains = variable_1.containsVariable('asd', 'asd2.$env', 'env');
                        common_1.expect(contains).to.be(true);
                    });
                });
            });
            common_1.describe('assignModelProperties', function () {
                common_1.it('only set properties defined in defaults', function () {
                    var target = { test: 'asd' };
                    variable_1.assignModelProperties(target, { propA: 1, propB: 2 }, { propB: 0 });
                    common_1.expect(target.propB).to.be(2);
                    common_1.expect(target.test).to.be('asd');
                });
                common_1.it('use default value if not found on source', function () {
                    var target = { test: 'asd' };
                    variable_1.assignModelProperties(target, { propA: 1, propB: 2 }, { propC: 10 });
                    common_1.expect(target.propC).to.be(10);
                });
            });
        }
    }
});
//# sourceMappingURL=variable_specs.js.map