/// <reference path="../../../../public/app/headers/common.d.ts" />
export declare class AlertListCtrl {
    private backendSrv;
    private $location;
    alerts: any;
    stateFilters: {
        text: string;
        value: string;
    }[];
    filters: {
        state: string;
    };
    /** @ngInject */
    constructor(backendSrv: any, $location: any);
    filtersChanged(): void;
    loadAlerts(): void;
    openHowTo(): void;
}
