"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const result_from_http_1 = require("./result-from-http");
describe("unit test for results http service", () => {
    const serviceTest = async (status) => ({ status, data: { name: 'goku' } });
    it("when have a response with errors", async () => {
        const result400 = (0, result_from_http_1.buildResultFromHttp)(await serviceTest(400));
        (0, chai_1.expect)(result400.isSuccess).to.be.false;
        (0, chai_1.expect)(result400.value).eql({
            code: '400',
            nameService: 'serviceTest'
        });
        const result500 = (0, result_from_http_1.buildResultFromHttp)(await serviceTest(500));
        (0, chai_1.expect)(result500.isSuccess).to.be.false;
        (0, chai_1.expect)(result500.value).eql({
            code: '500',
            nameService: 'serviceTest'
        });
    });
    it("when have a response with success", async () => {
        const result200 = (0, result_from_http_1.buildResultFromHttp)(await serviceTest(200));
        (0, chai_1.expect)(result200.isSuccess).to.be.true;
        (0, chai_1.expect)(result200.value).eql({
            name: 'goku'
        });
    });
});
