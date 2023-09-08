"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildResultFromHttp = void 0;
const failure_1 = require("../failure");
const result_1 = require("../result");
const buildResultFromHttp = (response) => {
    switch (response.status) {
        case 400:
            return (0, result_1.newFailure)((0, failure_1.getFailureHttp400)('serviceTest'));
        case 500:
            return (0, result_1.newFailure)((0, failure_1.getFailureHttp500)('serviceTest'));
        case 200:
            return (0, result_1.newSuccess)(response.data);
    }
};
exports.buildResultFromHttp = buildResultFromHttp;
