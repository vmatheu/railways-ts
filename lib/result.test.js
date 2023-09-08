"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const result_1 = require("./result");
describe("unit test for results", () => {
    describe("success path", () => {
        it("bindAsyncFailure", async () => {
            const result = (0, result_1.newSuccess)(1);
            const sumCountFailure = async (i) => (0, result_1.newSuccess)(2);
            const resultAwait = await result.bindAsyncFailure(sumCountFailure);
            (0, chai_1.expect)(resultAwait.isSuccess).to.be.true;
            (0, chai_1.expect)(resultAwait.value).to.be.eql(1);
        });
        it("bindAsync", async () => {
            const result = (0, result_1.newSuccess)(1);
            const sumCount = async (i) => (0, result_1.newSuccess)(i + "");
            const resultAwait = await result.bindAsync(sumCount);
            (0, chai_1.expect)(resultAwait.isSuccess).to.be.true;
            (0, chai_1.expect)(resultAwait.value).to.be.eql("1");
        });
        it("iterFailure", async () => {
            const result = (0, result_1.newSuccess)(1);
            let count = 1;
            const sumCount = (i) => count = count + i;
            result.iterFailure(sumCount);
            (0, chai_1.expect)(result.isSuccess).to.be.true;
            (0, chai_1.expect)(count).to.be.eql(1);
        });
        it("iter", async () => {
            const result = (0, result_1.newSuccess)(1);
            let count = 1;
            const sumCount = (i) => count = count + i;
            result.iter(sumCount);
            (0, chai_1.expect)(result.isSuccess).to.be.true;
            (0, chai_1.expect)(count).to.be.eql(2);
        });
        it("either", async () => {
            const result = (0, result_1.newSuccess)(1);
            const successEither = (i) => "success either";
            const failureEither = (i) => "failure either";
            const restulEither = result.either(successEither, failureEither);
            (0, chai_1.expect)(result.isSuccess).to.be.true;
            (0, chai_1.expect)(restulEither).to.be.eql("success either");
        });
        it("map", async () => {
            const result = (0, result_1.newSuccess)(1);
            const mapping = (count) => "mapping test " + count;
            const newResultMap = result.map(mapping);
            (0, chai_1.expect)(result.isSuccess).to.be.true;
            newResultMap.iter(value => (0, chai_1.expect)(value).eql("mapping test 1"));
        });
        it("mapFailure", async () => {
            const result = (0, result_1.newSuccess)(1);
            const mapping = (count) => "mapping test " + count;
            const newResultMap = result.mapFailure(mapping);
            (0, chai_1.expect)(result.isSuccess).to.be.true;
            newResultMap.iter(value => (0, chai_1.expect)(value).eql(1));
        });
    });
    describe("failure path", () => {
        it("bindAsyncFailure dont support success path", async () => {
            const result = (0, result_1.newFailure)("Test Error");
            const sumCountFailure = async (i) => (0, result_1.newSuccess)(1);
            try {
                await result.bindAsyncFailure(sumCountFailure);
                (0, chai_1.expect)("exception error not happend").to.be.false;
            }
            catch (error) {
                (0, chai_1.expect)(error.message).to.be.eql("bindAsyncFailure not support success rail");
            }
        });
        it("bindAsyncFailure", async () => {
            const result = (0, result_1.newFailure)("Test Error");
            const sumCountFailure = async (i) => (0, result_1.newFailure)("dos");
            const resultAwait = await result.bindAsyncFailure(sumCountFailure);
            (0, chai_1.expect)(resultAwait.isSuccess).to.be.false;
            (0, chai_1.expect)(resultAwait.value).to.be.eql("dos");
        });
        it("bindAsync", async () => {
            const result = (0, result_1.newFailure)("Test Error");
            const sumCount = async (i) => (0, result_1.newFailure)("Dont Happend");
            const resultAwait = await result.bindAsync(sumCount);
            (0, chai_1.expect)(resultAwait.isSuccess).to.be.false;
            (0, chai_1.expect)(resultAwait.value).to.be.eql("Test Error");
        });
        it("iterFailure", async () => {
            const result = (0, result_1.newFailure)(1);
            let count = 1;
            const sumCount = (i) => count = count + i;
            result.iterFailure(sumCount);
            (0, chai_1.expect)(result.isSuccess).to.be.false;
            (0, chai_1.expect)(count).to.be.eql(2);
        });
        it("iter", async () => {
            const result = (0, result_1.newFailure)(1);
            let count = 1;
            const sumCount = (i) => count = count + i;
            result.iter(sumCount);
            (0, chai_1.expect)(result.isSuccess).to.be.false;
            (0, chai_1.expect)(count).to.be.eql(1);
        });
        it("either", async () => {
            const result = (0, result_1.newFailure)(1);
            const successEither = (i) => "success either";
            const failureEither = (i) => "failure either";
            const restulEither = result.either(successEither, failureEither);
            (0, chai_1.expect)(result.isSuccess).to.be.false;
            (0, chai_1.expect)(restulEither).to.be.eql("failure either");
        });
        it("mapFailure", async () => {
            const result = (0, result_1.newFailure)(1);
            const mapping = (count) => "mapping test failure " + count;
            const newResultMap = result.mapFailure(mapping);
            (0, chai_1.expect)(result.isSuccess).to.be.false;
            newResultMap.iterFailure(value => (0, chai_1.expect)(value).eql("mapping test failure 1"));
        });
        it("map", async () => {
            const result = (0, result_1.newFailure)(1);
            const mapping = (count) => "mapping test " + count;
            const newResultMap = result.map(mapping);
            (0, chai_1.expect)(result.isSuccess).to.be.false;
            newResultMap.iter(value => (0, chai_1.expect)(value).eql(1));
        });
    });
});
