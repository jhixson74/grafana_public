System.register(['test/lib/common', '../query_variable'], function(exports_1) {
    var common_1, query_variable_1;
    return {
        setters:[
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (query_variable_1_1) {
                query_variable_1 = query_variable_1_1;
            }],
        execute: function() {
            common_1.describe('QueryVariable', function () {
                common_1.describe('when creating from model', function () {
                    common_1.it('should set defaults', function () {
                        var variable = new query_variable_1.QueryVariable({}, null, null, null, null);
                        common_1.expect(variable.datasource).to.be(null);
                        common_1.expect(variable.refresh).to.be(0);
                        common_1.expect(variable.sort).to.be(0);
                        common_1.expect(variable.name).to.be('');
                        common_1.expect(variable.hide).to.be(0);
                        common_1.expect(variable.options.length).to.be(0);
                        common_1.expect(variable.multi).to.be(false);
                        common_1.expect(variable.includeAll).to.be(false);
                    });
                    common_1.it('get model should copy changes back to model', function () {
                        var variable = new query_variable_1.QueryVariable({}, null, null, null, null);
                        variable.options = [{ text: 'test' }];
                        variable.datasource = 'google';
                        variable.regex = 'asd';
                        variable.sort = 50;
                        var model = variable.getModel();
                        common_1.expect(model.options.length).to.be(1);
                        common_1.expect(model.options[0].text).to.be('test');
                        common_1.expect(model.datasource).to.be('google');
                        common_1.expect(model.regex).to.be('asd');
                        common_1.expect(model.sort).to.be(50);
                    });
                });
            });
        }
    }
});
//# sourceMappingURL=query_variable_specs.js.map