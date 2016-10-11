/// <reference path="../../../../public/app/headers/common.d.ts" />
export declare class DashboardModel {
    id: any;
    title: any;
    autoUpdate: any;
    description: any;
    tags: any;
    style: any;
    timezone: any;
    editable: any;
    hideControls: any;
    sharedCrosshair: any;
    rows: any;
    time: any;
    timepicker: any;
    templating: any;
    annotations: any;
    refresh: any;
    snapshot: any;
    schemaVersion: number;
    version: number;
    revision: number;
    links: any;
    gnetId: any;
    meta: any;
    events: any;
    constructor(data: any, meta: any);
    private initMeta(meta);
    getSaveModelClone(): any;
    private ensureListExist(data);
    getNextPanelId(): number;
    forEachPanel(callback: any): void;
    getPanelById(id: any): any;
    rowSpan(row: any): any;
    addPanel(panel: any, row: any): void;
    isSubmenuFeaturesEnabled(): boolean;
    getPanelInfoById(panelId: any): any;
    duplicatePanel(panel: any, row: any): any;
    formatDate(date: any, format: any): any;
    getRelativeTime(date: any): any;
    getNextQueryLetter(panel: any): any;
    isTimezoneUtc(): boolean;
    getTimezone(): any;
    private updateSchema(old);
}
export declare class DashboardSrv {
    currentDashboard: any;
    create(dashboard: any, meta: any): DashboardModel;
    setCurrent(dashboard: any): void;
    getCurrent(): any;
}
