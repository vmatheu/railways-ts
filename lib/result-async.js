"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newFailureAsync = exports.newSuccessAsync = exports.mapBindAsync = exports.mapReduce = exports.newSuccessFromAsyncFN = exports.newResultFromAsyncFN = exports.newResultFromRule = exports.newFailureFromPromise = exports.newSuccessFromPromise = exports.newResultFromPromise = void 0;
const result_1 = require("./result");
const promiseToResultSuccess = (promise) => {
    return promise.then(value => {
        return (0, result_1.newSuccess)(value);
    });
};
const promiseToResultFailure = (promise) => {
    return promise.then(value => {
        return (0, result_1.newFailure)(value);
    });
};
const mapBindAsync = (func) => (vChain) => newSuccessFromPromise(func().then(result => ({
    ...vChain,
    newElement: result,
})));
exports.mapBindAsync = mapBindAsync;
const newResultFromPromise = (value) => ({
    value,
    map: mapping => newResultFromPromise(value.then(r => r.map(mapping))),
    mapFailure: mappingFailure => newResultFromPromise(value.then(r => r.mapFailure(mappingFailure))),
    iter: iterSuccess => newResultFromPromise(value.then(r => r.iter(iterSuccess))),
    iterFailure: iterFailure => newResultFromPromise(value.then(r => r.iterFailure(iterFailure))),
    then: (resolve, reject) => value.then(resolve, reject),
    catch: onReject => value.catch(onReject),
    finally: onFinally => value.finally(onFinally),
    [Symbol.toStringTag]: value[Symbol.toStringTag],
    protectSuccess: onCatch => newResultFromPromise(value.catch(e => (0, result_1.newSuccess)(onCatch(e)))),
    protectFailure: onCatch => newResultFromPromise(value.catch(e => (0, result_1.newFailure)(onCatch(e)))),
    bindAsync: binder => newResultFromPromise(value.then(r => r.bindAsync(binder))),
    ifSuccess: binderIfSuccess => newResultFromPromise(value.then(r => r.bindAsync(binderIfSuccess))),
    ifFailure: binderFailure => newResultFromPromise(value.then(r => r.bindAsyncFailure(binderFailure)))
});
exports.newResultFromPromise = newResultFromPromise;
/**
 *
 * @param value promise to resulAsync. You can use protectFailure for transform exception to Failure.
 * @returns ResultAsync with Success to return promise
 */
const newSuccessFromPromise = (value) => newResultFromPromise(promiseToResultSuccess(value));
exports.newSuccessFromPromise = newSuccessFromPromise;
/**
 *
 * @param value OK is passing to promise resolve. You can use protectFailure for transform exception to Failure.
 * @returns ResultAsync with Success to return promise
 */
const newSuccessAsync = (value) => newSuccessFromPromise(Promise.resolve(value));
exports.newSuccessAsync = newSuccessAsync;
/**
 *
 * @param value promise to resulAsync. You can use protectFailure for transform exception to Failure.
 * @returns ResultAsync with Failure to return promise
 */
const newFailureFromPromise = (value) => newResultFromPromise(promiseToResultFailure(value));
exports.newFailureFromPromise = newFailureFromPromise;
/**
 *
 * @param value promise to resulAsync. You can use protectFailure for transform exception to Failure.
 * @returns ResultAsync with Failure to return promise
 */
const newFailureAsync = (value) => newFailureFromPromise(Promise.resolve(value));
exports.newFailureAsync = newFailureAsync;
/**
 *
 * @param valueOrigin promise to resulAsync. You can use protectFailure for transform exception to Failure.
 * @param funRule function apply to valueOrigin if true return Success else return Failure
 * @returns ResultAsync with Success or Failure depends of funRule
 */
const newResultFromRule = (valueOrigin, funRule) => newResultFromPromise(valueOrigin.then(v => funRule(v)));
exports.newResultFromRule = newResultFromRule;
const mapReduce = (value) => { delete value['newElement']; return value; };
exports.mapReduce = mapReduce;
/**
 *
 * @param fnPrimary is a async function without params when execute then return "Success" but if exceute oncatch return Failure"
  * @returns ResultAsync with Success or Failure
 */
const newResultFromAsyncFN = (fnPrimary) => newResultFromPromise(fnPrimary()
    .then(v => (0, result_1.newSuccess)(v))
    .catch((e) => (0, result_1.newFailure)(e)));
exports.newResultFromAsyncFN = newResultFromAsyncFN;
/**
 *
 * @param fnPrimary is a async function without params when execute then return "Success" but if execute oncatch return Success"
 * @param mapErrorToSuccess is a function mapping when execute transform error to new object in Success result.
  * @returns ResultAsync with Success or Failure
 */
const newSuccessFromAsyncFN = (fnPrimary, mapErrorToSuccess) => newResultFromPromise(fnPrimary()
    .then(v => (0, result_1.newSuccess)(v))
    .catch((e) => (0, result_1.newSuccess)(mapErrorToSuccess(e))));
exports.newSuccessFromAsyncFN = newSuccessFromAsyncFN;
