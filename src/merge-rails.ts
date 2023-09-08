import { newFailure, newSuccess, Result } from "./result"
import { newResultFromRule, ResultAsync } from "./result-async"

/**
 * This function resolver array with promises Result
 * 
 * @param array ResultAsync to be execute with promise.all
 * 
 * @returns ResultAsync with Success OK Array or Failure array with Result<OK, FAIL>
 */
const resolveArrayResultAsync = <OK, FAIL>(
  array: Array<ResultAsync<OK, FAIL>>): ResultAsync<OK[], Result<OK, FAIL>[]> => {

  const resultsPromise = Promise.all(array)

  const validateResults = (results: Result<OK, FAIL>[]): Result<OK[], Result<OK, FAIL>[]> =>
    results.find(result => !result.isSuccess) ?
      newFailure(results) :
      newSuccess(results.map(result => result.value as OK))

  return newResultFromRule(resultsPromise, validateResults)
}

/**
 * This function merge two railway in one
 * 
 * @param r1 railway to merge
 * @param r2 railway to merge
 * 
 * @returns ResultAsync with Success or Failure array
 */
const mergePairRails = <OK1, OK2, FAIL>(
  r1: ResultAsync<OK1, FAIL>,
  r2: ResultAsync<OK2, FAIL>): ResultAsync<{ r1: OK1, r2: OK2 }, Result<any, FAIL>[]> => {

  const resultsPromise = Promise.all([r1, r2])
    .then(results => {
      return results[0].isSuccess && results[1].isSuccess ?
        {
          r1: (results[0].value),
          r2: (results[1].value)
        } :
        results
    })

  const validateResults = (result: Result<any, FAIL>[] | { r1: OK1; r2: OK2; }) =>
    result instanceof Array ?
      newFailure<{ r1: OK1, r2: OK2 }, Result<any, FAIL>[]>(result) :
      newSuccess<{ r1: OK1, r2: OK2 }, Result<any, FAIL>[]>(result)

  return newResultFromRule(resultsPromise, validateResults)
}

/**
 * This function merge three railway in one
 * 
 * @param r1 railway to merge
 * @param r2 railway to merge
 * @param r3 railway to merge
 * 
 * @returns ResultAsync with Success or Failure array
 */
const mergeThreeRails = <OK1, OK2, OK3, FAIL>(
  r1: ResultAsync<OK1, FAIL>,
  r2: ResultAsync<OK2, FAIL>,
  r3: ResultAsync<OK3, FAIL>): ResultAsync<{ r1: OK1, r2: OK2, r3: OK3 }, Result<any, FAIL>[]> => {

  const resultsPromise = Promise.all([r1, r2, r3])
    .then(results => {
      return results[0].isSuccess && results[1].isSuccess && results[2].isSuccess ?
        {
          r1: (results[0].value),
          r2: (results[1].value),
          r3: (results[2].value)
        } :
        results
    })

  const validateResults = (result: Result<any, FAIL>[] | { r1: OK1, r2: OK2, r3: OK3 }) =>
    result instanceof Array ?
      newFailure<{ r1: OK1, r2: OK2, r3: OK3 }, Result<any, FAIL>[]>(result) :
      newSuccess<{ r1: OK1, r2: OK2, r3: OK3 }, Result<any, FAIL>[]>(result)

  return newResultFromRule(resultsPromise, validateResults)
}

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
const mergeFourRails = <OK1, OK2, OK3, OK4, FAIL>(
  r1: ResultAsync<OK1, FAIL>,
  r2: ResultAsync<OK2, FAIL>,
  r3: ResultAsync<OK3, FAIL>,
  r4: ResultAsync<OK4, FAIL>): ResultAsync<{ r1: OK1, r2: OK2, r3: OK3, r4: OK4 }, Result<any, FAIL>[]> => {

  const resultsPromise = Promise.all([r1, r2, r3, r4])
    .then(results => {
      return results[0].isSuccess && results[1].isSuccess && results[2].isSuccess && results[3].isSuccess ?
        {
          r1: (results[0].value),
          r2: (results[1].value),
          r3: (results[2].value),
          r4: (results[3].value),
        } :
        results
    })

  const validateResults = (result: Result<any, FAIL>[] | { r1: OK1, r2: OK2, r3: OK3, r4: OK4 }) =>
    result instanceof Array ?
      newFailure<{ r1: OK1, r2: OK2, r3: OK3, r4: OK4 }, Result<any, FAIL>[]>(result) :
      newSuccess<{ r1: OK1, r2: OK2, r3: OK3, r4: OK4 }, Result<any, FAIL>[]>(result)

  return newResultFromRule(resultsPromise, validateResults)
}

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
 const mergeFiveRails = <OK1, OK2, OK3, OK4, OK5, FAIL>(
  r1: ResultAsync<OK1, FAIL>,
  r2: ResultAsync<OK2, FAIL>,
  r3: ResultAsync<OK3, FAIL>,
  r4: ResultAsync<OK4, FAIL>,
  r5: ResultAsync<OK5, FAIL>): ResultAsync<{ r1: OK1, r2: OK2, r3: OK3, r4: OK4, r5: OK5 }, Result<any, FAIL>[]> => {

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
        results
    })

  const validateResults = (result: Result<any, FAIL>[] | { r1: OK1, r2: OK2, r3: OK3, r4: OK4, r5: OK5 }) =>
    result instanceof Array ?
      newFailure<{ r1: OK1, r2: OK2, r3: OK3, r4: OK4, r5: OK5 }, Result<any, FAIL>[]>(result) :
      newSuccess<{ r1: OK1, r2: OK2, r3: OK3, r4: OK4, r5: OK5 }, Result<any, FAIL>[]>(result)

  return newResultFromRule(resultsPromise, validateResults)
}

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
 const mergeSixRails = <OK1, OK2, OK3, OK4, OK5, OK6, FAIL>(
  r1: ResultAsync<OK1, FAIL>,
  r2: ResultAsync<OK2, FAIL>,
  r3: ResultAsync<OK3, FAIL>,
  r4: ResultAsync<OK4, FAIL>,
  r5: ResultAsync<OK5, FAIL>,
  r6: ResultAsync<OK6, FAIL>): ResultAsync<{ r1: OK1, r2: OK2, r3: OK3, r4: OK4, r5: OK5, r6: OK6 }, Result<any, FAIL>[]> => {

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
        results
    })

  const validateResults = (result: Result<any, FAIL>[] | { r1: OK1, r2: OK2, r3: OK3, r4: OK4, r5: OK5, r6: OK6 }) =>
    result instanceof Array ?
      newFailure<{ r1: OK1, r2: OK2, r3: OK3, r4: OK4, r5: OK5, r6: OK6 }, Result<any, FAIL>[]>(result) :
      newSuccess<{ r1: OK1, r2: OK2, r3: OK3, r4: OK4, r5: OK5, r6: OK6 }, Result<any, FAIL>[]>(result)

  return newResultFromRule(resultsPromise, validateResults)
}

export {
  resolveArrayResultAsync,
  mergePairRails,
  mergeThreeRails,
  mergeFourRails,
  mergeFiveRails,
  mergeSixRails
}