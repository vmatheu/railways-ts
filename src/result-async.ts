import { newFailure, newSuccess, Result } from "./result"

type ResultAsync<OK, FAIL> = Promise<Result<OK, FAIL>> & {
  /**
  * Object Promise with Result 
  */
  readonly value: Promise<Result<OK, FAIL>>

  /**
  * Map function transform any Success ResultAsync to other Success ResultAsync
  */
  readonly map:
  <NewOK>(mapping: (v: OK) => NewOK) => ResultAsync<NewOK, FAIL>

  /**
   * MapFailure function transform any Failure ResultAsync to other Failure ResultAsync type,  
   */
  readonly mapFailure:
  <NewFAIL>(mapping: (v: FAIL) => NewFAIL) => ResultAsync<OK, NewFAIL>

  /**
   * ProtectSuccess function transform any exception to Success ResultAsync with the same base type, 
   * if you need other Success type, you can use map later.
   */
  readonly protectSuccess: (onCatch: (e: Error) => OK) => ResultAsync<OK, FAIL>

  /**
   * ProtectFailure function transform any exception to Failure ResultAsync with the same base type, 
   * if you need other Failure type, you can use mapFailure later.
   */
  readonly protectFailure: (onCatch: (e: Error) => FAIL) => ResultAsync<OK, FAIL>

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
  readonly bindAsync: <NewOK>(binder: (v: OK) => ResultAsync<NewOK, FAIL>) => ResultAsync<NewOK, FAIL>

  /**
  * BindAsyncFailure function Transform initial failure result to other failure result with asyn function.
  */
  readonly ifFailure: <NewFAIL>(binderFailure: (v: FAIL) => ResultAsync<OK, NewFAIL>) => ResultAsync<OK, NewFAIL>

  /**
   * Iteration function with input is Success Result and dont change chain Result
   */
  readonly iter: (doSomething: (v: OK) => void) => ResultAsync<OK, FAIL>

  /**
   * Iteration function with input is Failure Result and dont change chain Result 
   */
  readonly iterFailure: (doSomething: (v: FAIL) => void) => ResultAsync<OK, FAIL>

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
      readonly ifSuccess: <NewOK>(binder: (v: OK) => ResultAsync<NewOK, FAIL>) => ResultAsync<NewOK, FAIL>
}

const promiseToResultSuccess = <OK, FAIL>(promise: Promise<OK>): Promise<Result<OK, FAIL>> => {
  return promise.then(value => {
    return newSuccess<OK, FAIL>(value)
  })
}

const promiseToResultFailure = <OK, FAIL>(promise: Promise<FAIL>): Promise<Result<OK, FAIL>> => {
  return promise.then(value => {
    return newFailure<OK, FAIL>(value)
  })
}

const mapBindAsync = <OKElem, FAIL>(func: () => Promise<OKElem>) => <OK>(vChain: OK) =>
  newSuccessFromPromise<OK & { newElement: OKElem }, FAIL>(
    func().then(result => ({
      ...vChain,
      newElement: result,
    })
  ))

const newResultFromPromise = <OK, FAIL>(value: Promise<Result<OK, FAIL>>): ResultAsync<OK, FAIL> => ({
  value,
  map: mapping => newResultFromPromise(value.then(r => r.map(mapping))),
  mapFailure: mappingFailure => newResultFromPromise(value.then(r => r.mapFailure(mappingFailure))),
  iter: iterSuccess => newResultFromPromise(value.then(r => r.iter(iterSuccess))),
  iterFailure: iterFailure => newResultFromPromise(value.then(r => r.iterFailure(iterFailure))),
  then: (resolve, reject) => value.then(resolve, reject),
  catch: onReject => value.catch(onReject),
  finally: onFinally => value.finally(onFinally),
  [Symbol.toStringTag]: value[Symbol.toStringTag],
  protectSuccess: onCatch => newResultFromPromise(value.catch(e => newSuccess(onCatch(e)))),
  protectFailure: onCatch => newResultFromPromise(value.catch(e => newFailure(onCatch(e)))),
  bindAsync: binder => newResultFromPromise(value.then(r => r.bindAsync(binder))),
  ifSuccess: binderIfSuccess => newResultFromPromise(value.then(r => r.bindAsync(binderIfSuccess))),
  ifFailure: binderFailure => newResultFromPromise(value.then(r => r.bindAsyncFailure(binderFailure)))
})

/**
 * 
 * @param value promise to resulAsync. You can use protectFailure for transform exception to Failure.
 * @returns ResultAsync with Success to return promise 
 */
const newSuccessFromPromise = <OK, FAIL>(value: Promise<OK>): ResultAsync<OK, FAIL> =>
  newResultFromPromise(promiseToResultSuccess<OK, FAIL>(value))


/**
 * 
 * @param value OK is passing to promise resolve. You can use protectFailure for transform exception to Failure.
 * @returns ResultAsync with Success to return promise 
 */
 const newSuccessAsync = <OK, FAIL>(value: OK): ResultAsync<OK, FAIL> =>
  newSuccessFromPromise(Promise.resolve(value))

/**
 * 
 * @param value promise to resulAsync. You can use protectFailure for transform exception to Failure.
 * @returns ResultAsync with Failure to return promise 
 */
const newFailureFromPromise = <OK, FAIL>(value: Promise<FAIL>): ResultAsync<OK, FAIL> =>
  newResultFromPromise(promiseToResultFailure<OK, FAIL>(value))

/**
 * 
 * @param value promise to resulAsync. You can use protectFailure for transform exception to Failure.
 * @returns ResultAsync with Failure to return promise 
 */
 const newFailureAsync = <OK, FAIL>(value: FAIL): ResultAsync<OK, FAIL> =>
 newFailureFromPromise(Promise.resolve(value))

/**
 * 
 * @param valueOrigin promise to resulAsync. You can use protectFailure for transform exception to Failure.
 * @param funRule function apply to valueOrigin if true return Success else return Failure
 * @returns ResultAsync with Success or Failure depends of funRule
 */
const newResultFromRule = <OK, FAIL, TRes>(
  valueOrigin: Promise<TRes>,
  funRule: (value: TRes) => Result<OK, FAIL>) => newResultFromPromise(valueOrigin.then(v => funRule(v)))

const mapReduce = <OK>(value: OK): Omit<OK, 'newElement'> => { delete value['newElement']; return value }

/**
 * 
 * @param fnPrimary is a async function without params when execute then return "Success" but if exceute oncatch return Failure" 
  * @returns ResultAsync with Success or Failure
 */
 const newResultFromAsyncFN = <OK>(
  fnPrimary: () => Promise<OK>) => newResultFromPromise(
    fnPrimary()
        .then(v => newSuccess<OK,Error>(v))
        .catch((e: Error) => newFailure<OK, Error>(e))
    )

/**
 * 
 * @param fnPrimary is a async function without params when execute then return "Success" but if execute oncatch return Success"
 * @param mapErrorToSuccess is a function mapping when execute transform error to new object in Success result.
  * @returns ResultAsync with Success or Failure
 */
 const newSuccessFromAsyncFN = <OK, FAIL>(
  fnPrimary: () => Promise<OK>, mapErrorToSuccess: (e: FAIL) => OK) => newResultFromPromise(
    fnPrimary()
        .then(v => newSuccess<OK,FAIL>(v))
        .catch((e: FAIL) => newSuccess<OK, FAIL>(mapErrorToSuccess(e)))
    )

export {
  ResultAsync,
  newResultFromPromise,
  newSuccessFromPromise,
  newFailureFromPromise,
  newResultFromRule,
  newResultFromAsyncFN,
  newSuccessFromAsyncFN,
  mapReduce,
  mapBindAsync,
  newSuccessAsync,
  newFailureAsync
}
