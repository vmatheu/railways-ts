import { Result } from "./result";
declare type ResultAsync<OK, FAIL> = Promise<Result<OK, FAIL>> & {
    /**
    * Object Promise with Result
    */
    readonly value: Promise<Result<OK, FAIL>>;
    /**
    * Map function transform any Success ResultAsync to other Success ResultAsync
    */
    readonly map: <NewOK>(mapping: (v: OK) => NewOK) => ResultAsync<NewOK, FAIL>;
    /**
     * MapFailure function transform any Failure ResultAsync to other Failure ResultAsync type,
     */
    readonly mapFailure: <NewFAIL>(mapping: (v: FAIL) => NewFAIL) => ResultAsync<OK, NewFAIL>;
    /**
     * ProtectSuccess function transform any exception to Success ResultAsync with the same base type,
     * if you need other Success type, you can use map later.
     */
    readonly protectSuccess: (onCatch: (e: Error) => OK) => ResultAsync<OK, FAIL>;
    /**
     * ProtectFailure function transform any exception to Failure ResultAsync with the same base type,
     * if you need other Failure type, you can use mapFailure later.
     */
    readonly protectFailure: (onCatch: (e: Error) => FAIL) => ResultAsync<OK, FAIL>;
    /**
    * BindAsync function Transform initial result to other new result.
    * Example:
        .bindAsync(mapBindAsync(asyncGetYears))
        .map(elements => ({
          ...elements,
          years: elements.newElement
        }))
        .map(elements => mapReduce(elements))
    *
    */
    readonly bindAsync: <NewOK>(binder: (v: OK) => ResultAsync<NewOK, FAIL>) => ResultAsync<NewOK, FAIL>;
    /**
    * BindAsyncFailure function Transform initial failure result to other failure result with asyn function.
    */
    readonly ifFailure: <NewFAIL>(binderFailure: (v: FAIL) => ResultAsync<OK, NewFAIL>) => ResultAsync<OK, NewFAIL>;
    /**
     * Iteration function with input is Success Result and dont change chain Result
     */
    readonly iter: (doSomething: (v: OK) => void) => ResultAsync<OK, FAIL>;
    /**
     * Iteration function with input is Failure Result and dont change chain Result
     */
    readonly iterFailure: (doSomething: (v: FAIL) => void) => ResultAsync<OK, FAIL>;
    /**
    * ifSuccess function Transform initial result to other new result.
    * Example:
        .bindAsync(mapBindAsync(asyncGetYears))
        .map(elements => ({
          ...elements,
          years: elements.newElement
        }))
        .map(elements => mapReduce(elements))
    *
    */
    readonly ifSuccess: <NewOK>(binder: (v: OK) => ResultAsync<NewOK, FAIL>) => ResultAsync<NewOK, FAIL>;
};
declare const mapBindAsync: <OKElem, FAIL>(func: () => Promise<OKElem>) => <OK>(vChain: OK) => ResultAsync<OK & {
    newElement: OKElem;
}, FAIL>;
declare const newResultFromPromise: <OK, FAIL>(value: Promise<Result<OK, FAIL>>) => ResultAsync<OK, FAIL>;
/**
 *
 * @param value promise to resulAsync. You can use protectFailure for transform exception to Failure.
 * @returns ResultAsync with Success to return promise
 */
declare const newSuccessFromPromise: <OK, FAIL>(value: Promise<OK>) => ResultAsync<OK, FAIL>;
/**
 *
 * @param value OK is passing to promise resolve. You can use protectFailure for transform exception to Failure.
 * @returns ResultAsync with Success to return promise
 */
declare const newSuccessAsync: <OK, FAIL>(value: OK) => ResultAsync<OK, FAIL>;
/**
 *
 * @param value promise to resulAsync. You can use protectFailure for transform exception to Failure.
 * @returns ResultAsync with Failure to return promise
 */
declare const newFailureFromPromise: <OK, FAIL>(value: Promise<FAIL>) => ResultAsync<OK, FAIL>;
/**
 *
 * @param value promise to resulAsync. You can use protectFailure for transform exception to Failure.
 * @returns ResultAsync with Failure to return promise
 */
declare const newFailureAsync: <OK, FAIL>(value: FAIL) => ResultAsync<OK, FAIL>;
/**
 *
 * @param valueOrigin promise to resulAsync. You can use protectFailure for transform exception to Failure.
 * @param funRule function apply to valueOrigin if true return Success else return Failure
 * @returns ResultAsync with Success or Failure depends of funRule
 */
declare const newResultFromRule: <OK, FAIL, TRes>(valueOrigin: Promise<TRes>, funRule: (value: TRes) => Result<OK, FAIL>) => ResultAsync<OK, FAIL>;
declare const mapReduce: <OK>(value: OK) => Omit<OK, "newElement">;
/**
 *
 * @param fnPrimary is a async function without params when execute then return "Success" but if exceute oncatch return Failure"
  * @returns ResultAsync with Success or Failure
 */
declare const newResultFromAsyncFN: <OK>(fnPrimary: () => Promise<OK>) => ResultAsync<OK, Error>;
/**
 *
 * @param fnPrimary is a async function without params when execute then return "Success" but if execute oncatch return Success"
 * @param mapErrorToSuccess is a function mapping when execute transform error to new object in Success result.
  * @returns ResultAsync with Success or Failure
 */
declare const newSuccessFromAsyncFN: <OK, FAIL>(fnPrimary: () => Promise<OK>, mapErrorToSuccess: (e: FAIL) => OK) => ResultAsync<OK, FAIL>;
export { ResultAsync, newResultFromPromise, newSuccessFromPromise, newFailureFromPromise, newResultFromRule, newResultFromAsyncFN, newSuccessFromAsyncFN, mapReduce, mapBindAsync, newSuccessAsync, newFailureAsync };
