import { Failure } from './failure';
import { Success } from './success';
declare type ResultKind = 'FAILURE' | 'SUCCESS';
interface ResultOps<OK, FAIL> {
    /**
     * Map function transform any Success Result to other type,
     */
    readonly map: <NewOK>(mappingSuccess: (v: OK) => NewOK) => Result<NewOK, FAIL>;
    /**
     * MapFailure function Transform any Failure Result to other type,
     */
    readonly mapFailure: <NewFAIL>(mappingFailure: (v: FAIL) => NewFAIL) => Result<OK, NewFAIL>;
    /**
     * Iteration function with input is Success Result and dont change chain Result
     */
    readonly iter: (doIterSuccess: (v: OK) => void) => Result<OK, FAIL>;
    /**
     * Iteration function with input is Failure Result and dont change chain Result
     */
    readonly iterFailure: (doIterFailure: (v: FAIL) => void) => Result<OK, FAIL>;
    /**
    * Either function recive Success and Failure and transform and one result type (rail junction)
    */
    readonly either: <NewType>(doEitherSuccess: (v: OK) => NewType, doEitherFailure: (v: FAIL) => NewType) => NewType;
    /**
     * BindAsync function transform initial result to other new Fail or Success in the success rail.
     */
    readonly bindAsync: <NewOK>(binderAsync: (v: OK) => Promise<Result<NewOK, FAIL>>) => Promise<Result<NewOK, FAIL>>;
    /**
    * BindAsyncFailure function transform initial Failure to caller other async function to transform failure.
    */
    readonly bindAsyncFailure: <NewFAIL>(binderAsync: (v: FAIL) => Promise<Result<OK, NewFAIL>>) => Promise<Result<OK, NewFAIL>>;
}
declare type Result<OK, FAIL> = (Success<OK> | Failure<FAIL>) & ResultOps<OK, FAIL>;
declare const newSuccess: <OK, FAIL>(value: OK) => Result<OK, FAIL>;
declare const newFailure: <OK, FAIL>(value: FAIL) => Result<OK, FAIL>;
export { Success, Failure, Result, newSuccess, newFailure, ResultKind, };
