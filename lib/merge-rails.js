"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeSixRails = exports.mergeFiveRails = exports.mergeFourRails = exports.mergeThreeRails = exports.mergePairRails = exports.resolveArrayResultAsync = void 0;
const result_1 = require("./result");
const result_async_1 = require("./result-async");
/**
 * This function resolver array with promises Result
 *
 * @param array ResultAsync to be execute with promise.all
 *
 * @returns ResultAsync with Success OK Array or Failure array with Result<OK, FAIL>
 */
const resolveArrayResultAsync = (array) => {
    const resultsPromise = Promise.all(array);
    const validateResults = (results) => results.find(result => !result.isSuccess) ?
        (0, result_1.newFailure)(results) :
        (0, result_1.newSuccess)(results.map(result => result.value));
    return (0, result_async_1.newResultFromRule)(resultsPromise, validateResults);
};
exports.resolveArrayResultAsync = resolveArrayResultAsync;
/**
 * This function merge two railway in one
 *
 * @param r1 railway to merge
 * @param r2 railway to merge
 *
 * @returns ResultAsync with Success or Failure array
 */
const mergePairRails = (r1, r2) => {
    const resultsPromise = Promise.all([r1, r2])
        .then(results => {
        return results[0].isSuccess && results[1].isSuccess ?
            {
                r1: (results[0].value),
                r2: (results[1].value)
            } :
            results;
    });
    const validateResults = (result) => result instanceof Array ?
        (0, result_1.newFailure)(result) :
        (0, result_1.newSuccess)(result);
    return (0, result_async_1.newResultFromRule)(resultsPromise, validateResults);
};
exports.mergePairRails = mergePairRails;
/**
 * This function merge three railway in one
 *
 * @param r1 railway to merge
 * @param r2 railway to merge
 * @param r3 railway to merge
 *
 * @returns ResultAsync with Success or Failure array
 */
const mergeThreeRails = (r1, r2, r3) => {
    const resultsPromise = Promise.all([r1, r2, r3])
        .then(results => {
        return results[0].isSuccess && results[1].isSuccess && results[2].isSuccess ?
            {
                r1: (results[0].value),
                r2: (results[1].value),
                r3: (results[2].value)
            } :
            results;
    });
    const validateResults = (result) => result instanceof Array ?
        (0, result_1.newFailure)(result) :
        (0, result_1.newSuccess)(result);
    return (0, result_async_1.newResultFromRule)(resultsPromise, validateResults);
};
exports.mergeThreeRails = mergeThreeRails;
/**
 * This function merge three railway in one
 *
 * @param r1 railway to merge
 * @param r2 railway to merge
 * @param r3 railway to merge
 * @param r4 railway to merge
 *
 * @returns ResultAsync with Success or Failure array
 */
const mergeFourRails = (r1, r2, r3, r4) => {
    const resultsPromise = Promise.all([r1, r2, r3, r4])
        .then(results => {
        return results[0].isSuccess && results[1].isSuccess && results[2].isSuccess && results[3].isSuccess ?
            {
                r1: (results[0].value),
                r2: (results[1].value),
                r3: (results[2].value),
                r4: (results[3].value),
            } :
            results;
    });
    const validateResults = (result) => result instanceof Array ?
        (0, result_1.newFailure)(result) :
        (0, result_1.newSuccess)(result);
    return (0, result_async_1.newResultFromRule)(resultsPromise, validateResults);
};
exports.mergeFourRails = mergeFourRails;
/**
 * This function merge three railway in one
 *
 * @param r1 railway to merge
 * @param r2 railway to merge
 * @param r3 railway to merge
 * @param r4 railway to merge
 * @param r5 railway to merge
 *
 * @returns ResultAsync with Success or Failure array
 */
const mergeFiveRails = (r1, r2, r3, r4, r5) => {
    const resultsPromise = Promise.all([r1, r2, r3, r4, r5])
        .then(results => {
        return results[0].isSuccess && results[1].isSuccess
            && results[2].isSuccess && results[3].isSuccess && results[4].isSuccess ?
            {
                r1: results[0].value,
                r2: results[1].value,
                r3: results[2].value,
                r4: results[3].value,
                r5: results[4].value
            } :
            results;
    });
    const validateResults = (result) => result instanceof Array ?
        (0, result_1.newFailure)(result) :
        (0, result_1.newSuccess)(result);
    return (0, result_async_1.newResultFromRule)(resultsPromise, validateResults);
};
exports.mergeFiveRails = mergeFiveRails;
/**
 * This function merge three railway in one
 *
 * @param r1 railway to merge
 * @param r2 railway to merge
 * @param r3 railway to merge
 * @param r4 railway to merge
 * @param r5 railway to merge
 * @param r6 railway to merge
 *
 * @returns ResultAsync with Success or Failure array
 */
const mergeSixRails = (r1, r2, r3, r4, r5, r6) => {
    const resultsPromise = Promise.all([r1, r2, r3, r4, r5, r6])
        .then(results => {
        return results[0].isSuccess && results[1].isSuccess && results[2].isSuccess
            && results[3].isSuccess && results[4].isSuccess && results[5].isSuccess ?
            {
                r1: results[0].value,
                r2: results[1].value,
                r3: results[2].value,
                r4: results[3].value,
                r5: results[4].value,
                r6: results[5].value
            } :
            results;
    });
    const validateResults = (result) => result instanceof Array ?
        (0, result_1.newFailure)(result) :
        (0, result_1.newSuccess)(result);
    return (0, result_async_1.newResultFromRule)(resultsPromise, validateResults);
};
exports.mergeSixRails = mergeSixRails;
