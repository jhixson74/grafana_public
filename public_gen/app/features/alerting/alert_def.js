///<reference path="../../headers/common.d.ts" />
System.register(['lodash', 'app/core/components/query_part/query_part'], function(exports_1) {
    var lodash_1, query_part_1;
    var alertQueryDef, conditionTypes, evalFunctions, reducerTypes, noDataModes;
    function createReducerPart(model) {
        var def = new query_part_1.QueryPartDef({ type: model.type, defaultParams: [] });
        return new query_part_1.QueryPart(model, def);
    }
    function getStateDisplayModel(state) {
        switch (state) {
            case 'ok': {
                return {
                    text: 'OK',
                    iconClass: 'icon-gf icon-gf-online',
                    stateClass: 'alert-state-ok'
                };
            }
            case 'alerting': {
                return {
                    text: 'ALERTING',
                    iconClass: 'icon-gf icon-gf-critical',
                    stateClass: 'alert-state-critical'
                };
            }
            case 'no_data': {
                return {
                    text: 'NO DATA',
                    iconClass: "fa fa-question",
                    stateClass: 'alert-state-warning'
                };
            }
            case 'execution_error': {
                return {
                    text: 'EXECUTION ERROR',
                    iconClass: 'icon-gf icon-gf-critical',
                    stateClass: 'alert-state-critical'
                };
            }
            case 'paused': {
                return {
                    text: 'paused',
                    iconClass: "fa fa-pause",
                    stateClass: 'alert-state-paused'
                };
            }
        }
    }
    function joinEvalMatches(matches, seperator) {
        return lodash_1.default.reduce(matches, function (res, ev) {
            if (ev.Metric !== undefined && ev.Value !== undefined) {
                res.push(ev.Metric + "=" + ev.Value);
            }
            return res;
        }, []).join(seperator);
    }
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (query_part_1_1) {
                query_part_1 = query_part_1_1;
            }],
        execute: function() {
            alertQueryDef = new query_part_1.QueryPartDef({
                type: 'query',
                params: [
                    { name: "queryRefId", type: 'string', dynamicLookup: true },
                    { name: "from", type: "string", options: ['1s', '10s', '1m', '5m', '10m', '15m', '1h'] },
                    { name: "to", type: "string", options: ['now'] },
                ],
                defaultParams: ['#A', '5m', 'now', 'avg']
            });
            conditionTypes = [
                { text: 'Query', value: 'query' },
            ];
            evalFunctions = [
                { text: 'IS ABOVE', value: 'gt' },
                { text: 'IS BELOW', value: 'lt' },
                { text: 'IS OUTSIDE RANGE', value: 'outside_range' },
                { text: 'IS WITHIN RANGE', value: 'within_range' },
                { text: 'HAS NO VALUE', value: 'no_value' }
            ];
            reducerTypes = [
                { text: 'avg()', value: 'avg' },
                { text: 'min()', value: 'min' },
                { text: 'max()', value: 'max' },
                { text: 'sum()', value: 'sum' },
                { text: 'count()', value: 'count' },
            ];
            noDataModes = [
                { text: 'OK', value: 'ok' },
                { text: 'Alerting', value: 'alerting' },
                { text: 'No Data', value: 'no_data' },
            ];
            exports_1("default",{
                alertQueryDef: alertQueryDef,
                getStateDisplayModel: getStateDisplayModel,
                conditionTypes: conditionTypes,
                evalFunctions: evalFunctions,
                noDataModes: noDataModes,
                reducerTypes: reducerTypes,
                createReducerPart: createReducerPart,
                joinEvalMatches: joinEvalMatches,
            });
        }
    }
});
//# sourceMappingURL=alert_def.js.map