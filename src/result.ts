import { Failure } from './failure';
import { Success } from './success';

type ResultKind = 'FAILURE' | 'SUCCESS'

interface ResultOps<OK, FAIL> {
    /**
     * Map function transform any Success Result to other type, 
     */
    readonly map: <NewOK>(mappingSuccess: (v: OK) => NewOK)  => Result<NewOK, FAIL>
    
    /**
     * MapFailure function Transform any Failure Result to other type, 
     */
    readonly mapFailure:  <NewFAIL>(mappingFailure: (v: FAIL) => NewFAIL) => Result<OK, NewFAIL>
    
    /**
     * Iteration function with input is Success Result and dont change chain Result
     */
    readonly iter: (doIterSuccess: (v: OK) => void) => Result<OK, FAIL>
     
    /**
     * Iteration function with input is Failure Result and dont change chain Result 
     */
    readonly iterFailure: (doIterFailure: (v: FAIL) => void) => Result<OK, FAIL>
    
     /**
     * Either function recive Success and Failure and transform and one result type (rail junction)
     */
    readonly either: 
        <NewType>(
            doEitherSuccess: (v:OK) => NewType,
            doEitherFailure: (v:FAIL) => NewType) 
        => NewType

    /**
     * BindAsync function transform initial result to other new Fail or Success in the success rail.
     */
    readonly bindAsync: <NewOK>(binderAsync: (v: OK) => Promise<Result<NewOK, FAIL>>) => Promise<Result<NewOK, FAIL>>

     /**
     * BindAsyncFailure function transform initial Failure to caller other async function to transform failure.
     */
    readonly bindAsyncFailure: <NewFAIL>(binderAsync: (v: FAIL) => Promise<Result<OK, NewFAIL>>) => Promise<Result<OK, NewFAIL>>

}

type Result<OK, FAIL> = (Success<OK> | Failure<FAIL>) & ResultOps<OK, FAIL>

const newSuccess = <OK, FAIL>(value: OK): Result<OK, FAIL> => ({
    kind: 'SUCCESS',
    isSuccess: true,
    value,
    iter: doIterSuccess => {doIterSuccess(value); return newSuccess(value)},
    iterFailure: _ => newSuccess(value),
    either: doEitherSuccess => doEitherSuccess(value),
    map: mappingSuccess => newSuccess(mappingSuccess(value)),
    mapFailure: () => newSuccess(value),
    bindAsync: async binderAsync => await binderAsync(value),
    bindAsyncFailure: async _ => newSuccess(value), 
})

const newFailure = <OK, FAIL>(value: FAIL): Result<OK, FAIL> => ({
    kind: 'FAILURE',
    isSuccess: false,
    value,
    iterFailure: doIterFailure => {doIterFailure(value); return newFailure(value)},
    iter: _ => newFailure(value),
    either: (_, doEitherFailure) => doEitherFailure(value),
    map: () => newFailure(value),
    mapFailure: mappingFailure => newFailure(mappingFailure(value)),
    bindAsync: async _ => newFailure(value),
    bindAsyncFailure: async binderAsyncFailure => {
        const failure = await binderAsyncFailure(value)
        if(failure.kind === "SUCCESS") {
            throw new Error("bindAsyncFailure not support success rail")
        }
        return failure
    } 
})

export {
    Success,
    Failure,
    Result,
    newSuccess,
    newFailure,
    ResultKind,
}
