/// <reference path="../../../../public/app/headers/common.d.ts" />
export declare class AlertTabCtrl {
    private $scope;
    private $timeout;
    private backendSrv;
    private dashboardSrv;
    private uiSegmentSrv;
    private $q;
    private datasourceSrv;
    private templateSrv;
    panel: any;
    panelCtrl: any;
    testing: boolean;
    testResult: any;
    subTabIndex: number;
    conditionTypes: any;
    alert: any;
    conditionModels: any;
    evalFunctions: any;
    noDataModes: any;
    addNotificationSegment: any;
    notifications: any;
    alertNotifications: any;
    error: string;
    appSubUrl: string;
    alertHistory: any;
    /** @ngInject */
    constructor($scope: any, $timeout: any, backendSrv: any, dashboardSrv: any, uiSegmentSrv: any, $q: any, datasourceSrv: any, templateSrv: any);
    $onInit(): any;
    getAlertHistory(): void;
    getNotificationIcon(type: any): string;
    getNotifications(): Promise<any>;
    changeTabIndex(newTabIndex: any): void;
    notificationAdded(): void;
    removeNotification(index: any): void;
    initModel(): void;
    graphThresholdChanged(evt: any): void;
    buildDefaultCondition(): {
        type: string;
        query: {
            params: string[];
        };
        reducer: {
            type: string;
            params: any[];
        };
        evaluator: {
            type: string;
            params: any[];
        };
    };
    validateModel(): void;
    buildConditionModel(source: any): any;
    handleQueryPartEvent(conditionModel: any, evt: any): any;
    handleReducerPartEvent(conditionModel: any, evt: any): any;
    addCondition(type: any): void;
    removeCondition(index: any): void;
    delete(): void;
    enable(): void;
    evaluatorParamsChanged(): void;
    evaluatorTypeChanged(evaluator: any): void;
    test(): any;
}
/** @ngInject */
export declare function alertTab(): {
    restrict: string;
    scope: boolean;
    templateUrl: string;
    controller: typeof AlertTabCtrl;
};
