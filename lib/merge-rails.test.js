"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const merge_rails_1 = require("./merge-rails");
const result_async_1 = require("./result-async");
describe("merge rails test", () => {
    describe("execute promise in parallel", () => {
        const TIME = 1;
        const sleep = (mls, value) => {
            return new Promise((resolve, reject) => {
                setTimeout(resolve, mls, value);
            });
        };
        const sleepReject = (mls) => {
            return new Promise((resolve, reject) => {
                setTimeout(reject, mls, "Error sleep");
            });
        };
        it("when have two promises and one error", async () => {
            const result = await (0, merge_rails_1.mergePairRails)((0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "1")), (0, result_async_1.newResultFromAsyncFN)(() => sleepReject(TIME)));
            (0, chai_1.expect)(result.isSuccess).to.be.false;
            result.iterFailure(fail => {
                (0, chai_1.expect)(fail[0].isSuccess).to.be.true;
                (0, chai_1.expect)(fail[1].isSuccess).to.be.false;
            });
        });
        it("when have two promises with all success", async () => {
            const result = await (0, merge_rails_1.mergePairRails)((0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "1")), (0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "2")));
            (0, chai_1.expect)(result.isSuccess).to.be.true;
            result.iter(value => (0, chai_1.expect)(value).eql({ r1: '1', r2: '2' }));
        });
        it("when have three promises and two error", async () => {
            const result = await (0, merge_rails_1.mergeThreeRails)((0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "1")), (0, result_async_1.newResultFromAsyncFN)(() => sleepReject(TIME)), (0, result_async_1.newResultFromAsyncFN)(() => sleepReject(TIME)));
            (0, chai_1.expect)(result.isSuccess).to.be.false;
            result.iterFailure(fail => {
                (0, chai_1.expect)(fail[0].isSuccess).to.be.true;
                (0, chai_1.expect)(fail[1].isSuccess).to.be.false;
                (0, chai_1.expect)(fail[2].isSuccess).to.be.false;
            });
        });
        it("when have three promises with all success", async () => {
            const result = await (0, merge_rails_1.mergeThreeRails)((0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "1")), (0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "2")), (0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "3")));
            (0, chai_1.expect)(result.isSuccess).to.be.true;
            result.iter(value => (0, chai_1.expect)(value).eql({ r1: '1', r2: '2', r3: '3' }));
        });
        it("when have array promises with error", async () => {
            const result = await (0, merge_rails_1.resolveArrayResultAsync)([
                (0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "1")),
                (0, result_async_1.newResultFromAsyncFN)(() => sleepReject(TIME)),
                (0, result_async_1.newResultFromAsyncFN)(() => sleepReject(TIME))
            ]);
            (0, chai_1.expect)(result.isSuccess).to.be.false;
            result.iterFailure(fail => {
                (0, chai_1.expect)(fail[0].isSuccess).to.be.true;
                (0, chai_1.expect)(fail[1].isSuccess).to.be.false;
                (0, chai_1.expect)(fail[2].isSuccess).to.be.false;
            });
        });
        it("when have array promises with all success", async () => {
            const result = await (0, merge_rails_1.resolveArrayResultAsync)([
                (0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "1")),
                (0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "2")),
                (0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "3"))
            ]);
            (0, chai_1.expect)(result.isSuccess).to.be.true;
            result.iter(value => (0, chai_1.expect)(value).eql(['1', '2', '3']));
        });
        it("when have four promises and two error", async () => {
            const result = await (0, merge_rails_1.mergeFourRails)((0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "1")), (0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "2")), (0, result_async_1.newResultFromAsyncFN)(() => sleepReject(TIME)), (0, result_async_1.newResultFromAsyncFN)(() => sleepReject(TIME)));
            (0, chai_1.expect)(result.isSuccess).to.be.false;
            result.iterFailure(fail => {
                (0, chai_1.expect)(fail[0].isSuccess).to.be.true;
                (0, chai_1.expect)(fail[1].isSuccess).to.be.true;
                (0, chai_1.expect)(fail[2].isSuccess).to.be.false;
                (0, chai_1.expect)(fail[3].isSuccess).to.be.false;
            });
        });
        it("when have four promises with all success", async () => {
            const result = await (0, merge_rails_1.mergeFourRails)((0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "1")), (0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "2")), (0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "3")), (0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "4")));
            (0, chai_1.expect)(result.isSuccess).to.be.true;
            result.iter(value => (0, chai_1.expect)(value).eql({ r1: '1', r2: '2', r3: '3', r4: '4' }));
        });
        it("when have five promises and two error", async () => {
            const result = await (0, merge_rails_1.mergeFiveRails)((0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "1")), (0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "2")), (0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "3")), (0, result_async_1.newResultFromAsyncFN)(() => sleepReject(TIME)), (0, result_async_1.newResultFromAsyncFN)(() => sleepReject(TIME)));
            (0, chai_1.expect)(result.isSuccess).to.be.false;
            result.iterFailure(fail => {
                (0, chai_1.expect)(fail[0].isSuccess).to.be.true;
                (0, chai_1.expect)(fail[1].isSuccess).to.be.true;
                (0, chai_1.expect)(fail[2].isSuccess).to.be.true;
                (0, chai_1.expect)(fail[3].isSuccess).to.be.false;
                (0, chai_1.expect)(fail[4].isSuccess).to.be.false;
            });
        });
        it("when have five promises with all success", async () => {
            const result = await (0, merge_rails_1.mergeFiveRails)((0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "1")), (0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "2")), (0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "3")), (0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "4")), (0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "5")));
            (0, chai_1.expect)(result.isSuccess).to.be.true;
            result.iter(value => (0, chai_1.expect)(value).eql({ r1: '1', r2: '2', r3: '3', r4: '4', r5: '5' }));
        });
        it("when have six promises and two error", async () => {
            const result = await (0, merge_rails_1.mergeSixRails)((0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "1")), (0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "2")), (0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "3")), (0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "4")), (0, result_async_1.newResultFromAsyncFN)(() => sleepReject(TIME)), (0, result_async_1.newResultFromAsyncFN)(() => sleepReject(TIME)));
            (0, chai_1.expect)(result.isSuccess).to.be.false;
            result.iterFailure(fail => {
                (0, chai_1.expect)(fail[0].isSuccess).to.be.true;
                (0, chai_1.expect)(fail[1].isSuccess).to.be.true;
                (0, chai_1.expect)(fail[2].isSuccess).to.be.true;
                (0, chai_1.expect)(fail[3].isSuccess).to.be.true;
                (0, chai_1.expect)(fail[4].isSuccess).to.be.false;
                (0, chai_1.expect)(fail[5].isSuccess).to.be.false;
            });
        });
        it("when have five promises with all success", async () => {
            const result = await (0, merge_rails_1.mergeSixRails)((0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "1")), (0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "2")), (0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "3")), (0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "4")), (0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "5")), (0, result_async_1.newResultFromAsyncFN)(() => sleep(TIME, "6")));
            (0, chai_1.expect)(result.isSuccess).to.be.true;
            result.iter(value => (0, chai_1.expect)(value).eql({ r1: '1', r2: '2', r3: '3', r4: '4', r5: '5', r6: '6' }));
        });
    });
});
