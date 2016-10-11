///<reference path="../../headers/common.d.ts" />
System.register(['lodash', 'app/core/utils/kbn'], function(exports_1) {
    var lodash_1, kbn_1;
    var variableTypes;
    function assignModelProperties(target, source, defaults) {
        lodash_1.default.forEach(defaults, function (value, key) {
            target[key] = source[key] === undefined ? value : source[key];
        });
    }
    exports_1("assignModelProperties", assignModelProperties);
    function containsVariable() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var variableName = args[args.length - 1];
        var str = args[0] || '';
        for (var i = 1; i < args.length - 1; i++) {
            str += args[i] || '';
        }
        variableName = kbn_1.default.regexEscape(variableName);
        var findVarRegex = new RegExp('\\$(' + variableName + ')(?:\\W|$)|\\[\\[(' + variableName + ')\\]\\]', 'g');
        var match = findVarRegex.exec(str);
        return match !== null;
    }
    exports_1("containsVariable", containsVariable);
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (kbn_1_1) {
                kbn_1 = kbn_1_1;
            }],
        execute: function() {
            exports_1("variableTypes", variableTypes = {});
        }
    }
});
//# sourceMappingURL=variable.js.map