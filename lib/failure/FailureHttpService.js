"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFailureHttp500 = exports.getFailureHttp400 = void 0;
const getFailureHttp400 = (nameService) => ({
    code: '400',
    nameService: nameService
});
exports.getFailureHttp400 = getFailureHttp400;
const getFailureHttp500 = (nameService) => ({
    code: '500',
    nameService: nameService
});
exports.getFailureHttp500 = getFailureHttp500;
