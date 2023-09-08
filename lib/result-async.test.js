"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const result_1 = require("./result");
const result_async_1 = require("./result-async");
describe("unit test for async results ", () => {
    const RESULT_FUNC = "Goku ";
    const asyncService = async () => RESULT_FUNC;
    const asyncGetYears = async () => 20;
    const asyncGetName = async () => "Susuke";
    const asyncGetNumber = async () => 1;
    const asyncPersonInfo = async (name) => name + " Persona Info";
    const asyncGetLasName = (flag = 1) => {
        if (flag === 0) {
            return () => {
                throw new Error("Error Sakuragui Test");
            };
        }
        return async () => "Uchiha";
    };
    describe("success path", () => {
        it("binderAsyncFailure result async", async () => {
            const resultAsync = (0, result_async_1.newSuccessFromPromise)(asyncService());
            resultAsync.ifFailure((v) => (0, result_async_1.newFailureFromPromise)(asyncGetNumber()));
            const result = await resultAsync;
            (0, chai_1.expect)(result.isSuccess).to.be.true;
            (0, chai_1.expect)(result.value).to.be.eql("Goku ");
        });
        it("new success async", async () => {
            const resultAsync = (0, result_async_1.newSuccessAsync)("Success");
            const result = await resultAsync;
            (0, chai_1.expect)(result.isSuccess).to.be.true;
            (0, chai_1.expect)(result.value).to.be.eql("Success");
        });
        it("ifSuccess result async", async () => {
            const resultAsync = (0, result_async_1.newSuccessFromPromise)(asyncService());
            resultAsync.ifSuccess((v) => (0, result_async_1.newSuccessFromPromise)(asyncGetName()));
            const result = await resultAsync;
            (0, chai_1.expect)(result.isSuccess).to.be.true;
            (0, chai_1.expect)(result.value).to.be.eql("Goku ");
        });
        it("iter result async", async () => {
            const resultAsync = (0, result_async_1.newSuccessFromPromise)(asyncService());
            resultAsync.iter(() => "this function don't change any thing");
            resultAsync.iterFailure(() => "this function don't execute");
            const result = await resultAsync;
            (0, chai_1.expect)(result.isSuccess).to.be.true;
            (0, chai_1.expect)(result.value).to.be.eql("Goku ");
        });
        it("finally and catch async", async () => {
            const resultAsync = (0, result_async_1.newSuccessFromPromise)(asyncService());
            resultAsync.finally(() => "this function don't change any thing");
            resultAsync.catch(() => "this function don't change any thing");
            const result = await resultAsync;
            (0, chai_1.expect)(result.isSuccess).to.be.true;
            (0, chai_1.expect)(result.value).to.be.eql("Goku ");
        });
        it("create result front async function", async () => {
            const method = async () => {
                return "OK";
            };
            const result = await (0, result_async_1.newResultFromAsyncFN)(method);
            (0, chai_1.expect)(result.isSuccess).to.be.true;
            (0, chai_1.expect)(result.value).to.be.eql("OK");
        });
        it("create success front async function", async () => {
            const method = async () => {
                return "OK";
            };
            const result = await (0, result_async_1.newSuccessFromAsyncFN)(method, (e) => "Error");
            (0, chai_1.expect)(result.isSuccess).to.be.true;
            (0, chai_1.expect)(result.value).to.be.eql("OK");
        });
        it("async flow build object from several services with depends", async () => {
            const resultAsync = (0, result_async_1.newSuccessFromPromise)(asyncGetName())
                .bindAsync(name => (0, result_async_1.newSuccessFromPromise)(asyncPersonInfo(name).then(fullName => ({ fullName }))));
            await resultAsync.then(result => {
                (0, chai_1.expect)(result.isSuccess).to.be.true;
                result.iter(value => {
                    (0, chai_1.expect)(value).to.be.eql({
                        "fullName": "Susuke Persona Info",
                    });
                });
            });
        });
        it("async flow build object from several services", async () => {
            const resultAsync = (0, result_async_1.newSuccessFromPromise)(asyncGetName())
                .map(name => ({ name }))
                .bindAsync((0, result_async_1.mapBindAsync)(asyncGetLasName()))
                .map(elements => ({
                ...elements,
                lastName: elements.newElement
            }))
                .bindAsync((0, result_async_1.mapBindAsync)(asyncGetYears))
                .map(elements => ({
                ...elements,
                years: elements.newElement
            }))
                .map(elements => (0, result_async_1.mapReduce)(elements));
            await resultAsync.then(result => {
                (0, chai_1.expect)(result.isSuccess).to.be.true;
                result.iter(value => {
                    (0, chai_1.expect)(value).to.be.eql({
                        "lastName": "Uchiha",
                        "name": "Susuke",
                        "years": 20
                    });
                });
            });
        });
        it("mapFailure", async () => {
            const value = asyncService();
            const resultAsync = (0, result_async_1.newSuccessFromPromise)(value);
            await resultAsync.mapFailure(value => value + "Kakaroto")
                .then(result => {
                (0, chai_1.expect)(result.isSuccess).to.be.true;
                (0, chai_1.expect)(result.value).to.be.eql(RESULT_FUNC);
            });
        });
        it("map", async () => {
            const value = asyncService();
            const resultAsync = (0, result_async_1.newSuccessFromPromise)(value);
            await resultAsync.map(value => value + "Kakaroto")
                .then(result => {
                (0, chai_1.expect)(result.isSuccess).to.be.true;
                (0, chai_1.expect)(result.value).to.be.eql(RESULT_FUNC + "Kakaroto");
            });
        });
        it("newResultFromRule", async () => {
            const value = asyncService();
            const funRule = (value) => value === RESULT_FUNC ?
                (0, result_1.newSuccess)(value) :
                (0, result_1.newFailure)(value);
            const resultAsync = await (0, result_async_1.newResultFromRule)(value, funRule);
            (0, chai_1.expect)(resultAsync.isSuccess).to.be.equal;
            resultAsync.iter(value => (0, chai_1.expect)(value).to.be.eql("Goku "));
        });
    });
    describe("failure path", () => {
        it("binderAsyncFailure result async", async () => {
            const resultAsync = (0, result_async_1.newFailureFromPromise)(asyncService())
                .ifFailure(() => (0, result_async_1.newFailureFromPromise)(asyncGetName()));
            const result = await resultAsync;
            (0, chai_1.expect)(result.isSuccess).to.be.false;
            (0, chai_1.expect)(result.value).to.be.eql("Susuke");
        });
        it("new failure async", async () => {
            const resultAsync = (0, result_async_1.newFailureAsync)("Failure");
            const result = await resultAsync;
            (0, chai_1.expect)(result.isSuccess).to.be.false;
            (0, chai_1.expect)(result.value).to.be.eql("Failure");
        });
        it("create result front async function", async () => {
            const method = async () => {
                return Promise.reject("Error");
            };
            const result = await (0, result_async_1.newResultFromAsyncFN)(method);
            (0, chai_1.expect)(result.isSuccess).to.be.false;
            (0, chai_1.expect)(result.value).to.be.eql("Error");
        });
        it("async flow build object from several services", async () => {
            const resultAsync = (0, result_async_1.newSuccessFromPromise)(asyncGetName())
                .map(name => ({ name }))
                .bindAsync((0, result_async_1.mapBindAsync)(asyncGetLasName(0)))
                .map(elements => ({
                ...elements,
                lastName: elements.newElement
            }))
                .bindAsync((0, result_async_1.mapBindAsync)(asyncGetYears))
                .map(elements => ({
                ...elements,
                years: elements.newElement
            }))
                .map(elements => (0, result_async_1.mapReduce)(elements))
                .protectFailure(err => err.message);
            await resultAsync.then(result => {
                (0, chai_1.expect)(result.isSuccess).to.be.false;
                result.iterFailure(error => {
                    (0, chai_1.expect)(error).to.be.eql("Error Sakuragui Test");
                });
            });
        });
        it("mapFailure", async () => {
            const resultAsync = (0, result_async_1.newFailureFromPromise)(asyncService());
            await resultAsync.mapFailure(value => value + "Kakaroto")
                .then(result => {
                (0, chai_1.expect)(result.isSuccess).to.be.false;
                (0, chai_1.expect)(result.value).to.be.eql(RESULT_FUNC + "Kakaroto");
            });
        });
        it("map", async () => {
            const resultAsync = (0, result_async_1.newFailureFromPromise)(asyncService());
            await resultAsync.map(value => value + "Kakaroto")
                .then(result => {
                (0, chai_1.expect)(result.isSuccess).to.be.false;
                (0, chai_1.expect)(result.value).to.be.eql(RESULT_FUNC);
            });
        });
        it("newResultFromRule", async () => {
            const funRule = (value) => value === RESULT_FUNC + "NO" ?
                (0, result_1.newSuccess)(value) :
                (0, result_1.newFailure)(value);
            const resultAsync = (0, result_async_1.newResultFromRule)(asyncService(), funRule);
            await resultAsync.then(result => (0, chai_1.expect)(result.isSuccess).to.be.false);
        });
        it("protect success", async () => {
            const value = async (flag) => {
                if (flag == 1)
                    throw new Error("Test Error");
                return "test";
            };
            const resultAsync = (0, result_async_1.newSuccessFromPromise)(value(1))
                .protectSuccess((e) => "Test is success");
            await resultAsync
                .then(result => {
                (0, chai_1.expect)(result.isSuccess).to.be.true;
                (0, chai_1.expect)(result.value).to.be.eql("Test is success");
            });
        });
        it("protect failure", async () => {
            const value = async (flag) => {
                if (flag == 1)
                    throw new Error("Test Error");
                return "test";
            };
            const resultAsync = (0, result_async_1.newFailureFromPromise)(value(1))
                .protectFailure((e) => "Test is Failure");
            await resultAsync
                .then(result => {
                (0, chai_1.expect)(result.isSuccess).to.be.false;
                (0, chai_1.expect)(result.value).to.be.eql("Test is Failure");
            });
        });
        it("create success front async function", async () => {
            const method = async () => {
                throw Error("OK");
            };
            const result = await (0, result_async_1.newSuccessFromAsyncFN)(method, (e) => "Error");
            (0, chai_1.expect)(result.isSuccess).to.be.true;
            (0, chai_1.expect)(result.value).to.be.eql("Error");
        });
    });
});
