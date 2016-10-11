/// <reference path="../../../../public/app/headers/common.d.ts" />
export declare class DashboardCtrl {
    private $scope;
    private $rootScope;
    /** @ngInject */
    constructor($scope: any, $rootScope: any, dashboardKeybindings: any, timeSrv: any, variableSrv: any, dashboardSrv: any, unsavedChangesSrv: any, dynamicDashboardSrv: any, dashboardViewStateSrv: any, contextSrv: any, alertSrv: any, $timeout: any);
    init(dashboard: any): void;
}
