/// <reference path="../../../../public/app/headers/common.d.ts" />
export interface Variable {
    setValue(option: any): any;
    updateOptions(): any;
    dependsOn(variable: any): any;
    setValueFromUrl(urlValue: any): any;
    getValueForUrl(): any;
    getModel(): any;
}
export declare var variableTypes: {};
export declare function assignModelProperties(target: any, source: any, defaults: any): void;
export declare function containsVariable(...args: any[]): boolean;
