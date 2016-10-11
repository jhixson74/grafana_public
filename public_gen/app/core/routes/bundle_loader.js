///<reference path="../../headers/common.d.ts" />
System.register([], function(exports_1) {
    var BundleLoader;
    return {
        setters:[],
        execute: function() {
            BundleLoader = (function () {
                function BundleLoader(bundleName) {
                    var defer = null;
                    this.lazy = ["$q", "$route", "$rootScope", function ($q, $route, $rootScope) {
                            if (defer) {
                                return defer.promise;
                            }
                            defer = $q.defer();
                            System.import(bundleName).then(function () {
                                defer.resolve();
                            });
                            return defer.promise;
                        }];
                }
                return BundleLoader;
            })();
            exports_1("BundleLoader", BundleLoader);
        }
    }
});
//# sourceMappingURL=bundle_loader.js.map