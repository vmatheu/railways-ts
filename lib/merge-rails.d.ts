import { Result } from "./result";
import { ResultAsync } from "./result-async";
/**
 * This function resolver array with promises Result
 *
 * @param array ResultAsync to be execute with promise.all
 *
 * @returns ResultAsync with Success OK Array or Failure array with Result<OK, FAIL>
 */
declare const resolveArrayResultAsync: <OK, FAIL>(array: ResultAsync<OK, FAIL>[]) => ResultAsync<OK[], Result<OK, FAIL>[]>;
/**
 * This function merge two railway in one
 *
 * @param r1 railway to merge
 * @param r2 railway to merge
 *
 * @returns ResultAsync with Success or Failure array
 */
declare const mergePairRails: <OK1, OK2, FAIL>(r1: ResultAsync<OK1, FAIL>, r2: ResultAsync<OK2, FAIL>) => ResultAsync<{
    r1: OK1;
    r2: OK2;
}, Result<any, FAIL>[]>;
/**
 * This function merge three railway in one
 *
 * @param r1 railway to merge
 * @param r2 railway to merge
 * @param r3 railway to merge
 *
 * @returns ResultAsync with Success or Failure array
 */
declare const mergeThreeRails: <OK1, OK2, OK3, FAIL>(r1: ResultAsync<OK1, FAIL>, r2: ResultAsync<OK2, FAIL>, r3: ResultAsync<OK3, FAIL>) => ResultAsync<{
    r1: OK1;
    r2: OK2;
    r3: OK3;
}, Result<any, FAIL>[]>;
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
declare const mergeFourRails: <OK1, OK2, OK3, OK4, FAIL>(r1: ResultAsync<OK1, FAIL>, r2: ResultAsync<OK2, FAIL>, r3: ResultAsync<OK3, FAIL>, r4: ResultAsync<OK4, FAIL>) => ResultAsync<{
    r1: OK1;
    r2: OK2;
    r3: OK3;
    r4: OK4;
}, Result<any, FAIL>[]>;
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
declare const mergeFiveRails: <OK1, OK2, OK3, OK4, OK5, FAIL>(r1: ResultAsync<OK1, FAIL>, r2: ResultAsync<OK2, FAIL>, r3: ResultAsync<OK3, FAIL>, r4: ResultAsync<OK4, FAIL>, r5: ResultAsync<OK5, FAIL>) => ResultAsync<{
    r1: OK1;
    r2: OK2;
    r3: OK3;
    r4: OK4;
    r5: OK5;
}, Result<any, FAIL>[]>;
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
declare const mergeSixRails: <OK1, OK2, OK3, OK4, OK5, OK6, FAIL>(r1: ResultAsync<OK1, FAIL>, r2: ResultAsync<OK2, FAIL>, r3: ResultAsync<OK3, FAIL>, r4: ResultAsync<OK4, FAIL>, r5: ResultAsync<OK5, FAIL>, r6: ResultAsync<OK6, FAIL>) => ResultAsync<{
    r1: OK1;
    r2: OK2;
    r3: OK3;
    r4: OK4;
    r5: OK5;
    r6: OK6;
}, Result<any, FAIL>[]>;
export { resolveArrayResultAsync, mergePairRails, mergeThreeRails, mergeFourRails, mergeFiveRails, mergeSixRails };
