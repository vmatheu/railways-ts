import { expect } from "chai";
import { newFailure, newSuccess } from "./result";

describe("unit test for results", () => {
  describe("success path", () => {
    it("bindAsyncFailure", async () => {
      const result = newSuccess<number, string>(1)
      const sumCountFailure = async (i: string) => newSuccess<number, string>(2)
      const resultAwait = await result.bindAsyncFailure(sumCountFailure)
      
      expect(resultAwait.isSuccess).to.be.true
      expect(resultAwait.value).to.be.eql(1)
    })

    it("bindAsync", async () => {
      const result = newSuccess<number, string>(1)
      const sumCount = async (i: number) => newSuccess<string, string>(i + "")
      const resultAwait = await result.bindAsync(sumCount)
      
      expect(resultAwait.isSuccess).to.be.true
      expect(resultAwait.value).to.be.eql("1")
    })

    it("iterFailure", async () => {
      const result = newSuccess<number, number>(1)
      let count = 1
      const sumCount = (i: number) => count = count + i
      result.iterFailure(sumCount)
      
      expect(result.isSuccess).to.be.true
      expect(count).to.be.eql(1)
    })

    it("iter", async () => {
      const result = newSuccess<number, number>(1)
      let count = 1
      const sumCount = (i: number) => count = count + i
      result.iter(sumCount)
      
      expect(result.isSuccess).to.be.true
      expect(count).to.be.eql(2)
    })

    it("either", async () => {
      const result = newSuccess<number, number>(1)
      const successEither = (i: number) => "success either"
      const failureEither = (i: number) => "failure either"
      const restulEither= result.either(successEither, failureEither)
      
      expect(result.isSuccess).to.be.true
      expect(restulEither).to.be.eql("success either")
    })

    it("map", async () => {
      const result = newSuccess<number, number>(1)
      const mapping = (count: number) => "mapping test " + count
      const newResultMap = result.map(mapping)
      
      expect(result.isSuccess).to.be.true
      newResultMap.iter(value => expect(value).eql("mapping test 1"))
    })

    it("mapFailure", async () => {
      const result = newSuccess<number, number>(1)
      const mapping = (count: number) => "mapping test " + count
      const newResultMap = result.mapFailure(mapping)
      
      expect(result.isSuccess).to.be.true
      newResultMap.iter(value => expect(value).eql(1))
    })
  })

  describe("failure path", () => {
    it("bindAsyncFailure dont support success path", async () => {
      const result = newFailure<number, string>("Test Error")
      const sumCountFailure = async (i: string) => newSuccess<number, string>(1)
      try {
        await result.bindAsyncFailure(sumCountFailure)
        expect("exception error not happend").to.be.false
      } catch (error) {
        expect(error.message).to.be.eql("bindAsyncFailure not support success rail")
      }
    })

    it("bindAsyncFailure", async () => {
      const result = newFailure<number, string>("Test Error")
      const sumCountFailure = async (i: string) => newFailure<number, string>("dos")
      const resultAwait = await result.bindAsyncFailure(sumCountFailure)
      
      expect(resultAwait.isSuccess).to.be.false
      expect(resultAwait.value).to.be.eql("dos")
    })

    it("bindAsync", async () => {
      const result = newFailure<number, string>("Test Error")
      const sumCount = async (i: number) => newFailure<string, string>("Dont Happend")
      const resultAwait = await result.bindAsync(sumCount)
      
      expect(resultAwait.isSuccess).to.be.false
      expect(resultAwait.value).to.be.eql("Test Error")
    })

    it("iterFailure", async () => {
      const result = newFailure<number, number>(1)
      let count = 1
      const sumCount = (i: number) => count = count + i
      result.iterFailure(sumCount)

      expect(result.isSuccess).to.be.false
      expect(count).to.be.eql(2)
    })

    it("iter", async () => {
      const result = newFailure<number, number>(1)
      let count = 1
      const sumCount = (i: number) => count = count + i
      result.iter(sumCount)

      expect(result.isSuccess).to.be.false
      expect(count).to.be.eql(1)
    })

    it("either", async () => {
      const result = newFailure<number, number>(1)
      const successEither = (i: number) => "success either"
      const failureEither = (i: number) => "failure either"
      const restulEither= result.either(successEither, failureEither)

      expect(result.isSuccess).to.be.false
      expect(restulEither).to.be.eql("failure either")
    })

    it("mapFailure", async () => {
      const result = newFailure<number, number>(1)
      const mapping = (count: number) => "mapping test failure " + count
      const newResultMap = result.mapFailure(mapping)
      
      expect(result.isSuccess).to.be.false
      newResultMap.iterFailure(value => expect(value).eql("mapping test failure 1"))
    })

    it("map", async () => {
      const result = newFailure<number, number>(1)
      const mapping = (count: number) => "mapping test " + count
      const newResultMap = result.map(mapping)
      
      expect(result.isSuccess).to.be.false
      newResultMap.iter(value => expect(value).eql(1))
    })
  })
})
