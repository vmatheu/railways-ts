import { expect } from "chai";
import { newFailure, newSuccess } from "./result";
import { newFailureFromPromise, 
  newSuccessFromPromise,
  newResultFromRule,
  mapReduce,
  mapBindAsync,
  newResultFromAsyncFN,
  newSuccessAsync,
  newFailureAsync,
  newSuccessFromAsyncFN,
  failureToSuccess,
  retryResult,
} from "./result-async";

describe("unit test for async results ", () => {
  const RESULT_FUNC = "Goku ";
  
  const asyncService = async () => RESULT_FUNC
  const asyncGetYears = async () => 20
  const asyncGetName = async () => "Susuke"
  const asyncGetNumber = async () => 1
  const asyncPersonInfo = async (name: string) => name + " Persona Info"

  const asyncGetLasName = (flag: number = 1) => {
    if (flag === 0){
      return () => {
        throw new Error("Error Sakuragui Test")
      }
    }
    return async () => "Uchiha"
  }

  describe("success path", () => {
    it("retryResult", async () => {
      let counter = 0
      const resultAsyncFn = () => {
        counter++
        return newSuccessAsync<string, string>("origin-result")
      }

      const expected = await retryResult(resultAsyncFn, 3, 10)
      expect(expected.isSuccess).to.be.true
      expect(counter).to.be.eq(1)
    })

    it("binderAsyncFailure result async", async () => {
      const resultAsync = newSuccessFromPromise<string, string>(asyncService())
      resultAsync.ifFailure((v) => newFailureFromPromise(asyncGetNumber()))

      const result = await resultAsync
      expect(result.isSuccess).to.be.true
      expect(result.value).to.be.eql("Goku ")
    })

    it("new success async", async () => {
      const resultAsync = newSuccessAsync<string, string>("Success")
      const result = await resultAsync
      expect(result.isSuccess).to.be.true
      expect(result.value).to.be.eql("Success")
    })

    it("ifSuccess result async", async () => {
      const resultAsync = newSuccessFromPromise<string, string>(asyncService())
      resultAsync.ifSuccess((v) => newSuccessFromPromise(asyncGetName()))

      const result = await resultAsync
      expect(result.isSuccess).to.be.true
      expect(result.value).to.be.eql("Goku ")
    })

    it("iter result async", async () => {
      const resultAsync = newSuccessFromPromise<string, string>(asyncService())

      resultAsync.iter(()=>"this function don't change any thing")
      resultAsync.iterFailure(()=>"this function don't execute")

      const result = await resultAsync
      expect(result.isSuccess).to.be.true
      expect(result.value).to.be.eql("Goku ")
    })

    it("finally and catch async", async () => {
      const resultAsync = newSuccessFromPromise<string, string>(asyncService())
      resultAsync.finally(()=>"this function don't change any thing")
      resultAsync.catch(()=>"this function don't change any thing")

      const result = await resultAsync
      expect(result.isSuccess).to.be.true
      expect(result.value).to.be.eql("Goku ")
    })

    it("create result front async function", async () => {
      const method = async () => {
        return "OK"
      }
      const result = await newResultFromAsyncFN(method)
         
      expect(result.isSuccess).to.be.true
      expect(result.value).to.be.eql("OK")
    })

    it("create success front async function", async () => {
      const method = async () => {
        return "OK"
      }
      const result = await newSuccessFromAsyncFN(method, (e: Error) => "Error")  
      expect(result.isSuccess).to.be.true
      expect(result.value).to.be.eql("OK")
    })

    it("async flow build object from several services with depends", async () => {
      const resultAsync =
        newSuccessFromPromise<string, Error>(asyncGetName())
          .bindAsync( name => 
            newSuccessFromPromise(
              asyncPersonInfo(name).then(fullName => ({fullName})))
          )
         
      await resultAsync.then(result => {
        expect(result.isSuccess).to.be.true
        result.iter(value => {
          expect(value).to.be.eql({
            "fullName": "Susuke Persona Info",
          })
        })
      })
    })

    it("async flow build object from several services", async () => {
      const resultAsync =
        newSuccessFromPromise<string, Error>(asyncGetName())
          .map(name => ({ name }))
          .bindAsync(mapBindAsync(asyncGetLasName()))
          .map(elements => ({
            ...elements,
            lastName: elements.newElement
          }))
          .bindAsync(mapBindAsync(asyncGetYears))
          .map(elements => ({
            ...elements,
            years: elements.newElement
          }))
          .map(elements => mapReduce(elements))

      await resultAsync.then(result => {
        expect(result.isSuccess).to.be.true
        result.iter(value => {
          expect(value).to.be.eql({
            "lastName": "Uchiha",
            "name": "Susuke",
            "years": 20
          })
        })
      })
    })

    it("mapFailure", async () => {
      const value = asyncService()
      const resultAsync = newSuccessFromPromise<string, undefined>(value)

      await resultAsync.mapFailure(value => value + "Kakaroto")
        .then(result => {
          expect(result.isSuccess).to.be.true
          expect(result.value).to.be.eql(RESULT_FUNC)
        })
    })

    it("map", async () => {
      const value = asyncService()
      const resultAsync = newSuccessFromPromise<string, undefined>(value)

      await resultAsync.map(value => value + "Kakaroto")
        .then(result => {
          expect(result.isSuccess).to.be.true
          expect(result.value).to.be.eql(RESULT_FUNC + "Kakaroto")
        })
    })

    it("newResultFromRule", async () => {
      const value = asyncService()

      const funRule = (value: string) =>
        value === RESULT_FUNC ?
          newSuccess<string, string>(value) :
          newFailure<string, string>(value)

      const resultAsync = await newResultFromRule<string, string, string>(value, funRule)
      expect(resultAsync.isSuccess).to.be.true
      resultAsync.iter(
        value => expect(value).to.be.eql("Goku ")
      )
    })

    it("failureToSuccess", async () => {
      const resultAsync = newSuccessAsync<string, string>("origin-result")
      const newresult = await failureToSuccess(resultAsync, "not happend")

      expect(newresult.isSuccess).to.be.true
      newresult.iter(
        value => expect(value).to.be.eql("origin-result")
      )
    })
  })

  describe("failure path", () => {
    it("binderAsyncFailure result async", async () => {
      const resultAsync =
       newFailureFromPromise<string, string>(asyncService())
       .ifFailure(() => newFailureFromPromise(asyncGetName()))

       const result = await resultAsync
      expect(result.isSuccess).to.be.false
      expect(result.value).to.be.eql("Susuke")
    })

    it("new failure async", async () => {
      const resultAsync = newFailureAsync<string, string>("Failure")
      const result = await resultAsync
      expect(result.isSuccess).to.be.false
      expect(result.value).to.be.eql("Failure")
    })

    it("create result front async function", async () => {
      const method = async () => {
        return Promise.reject("Error")
      }
      const result = await newResultFromAsyncFN<never>(method)
         
      expect(result.isSuccess).to.be.false
      expect(result.value).to.be.eql("Error")
    })

    it("async flow build object from several services", async () => {
      const resultAsync =
        newSuccessFromPromise<string, string>(asyncGetName())
          .map(name => ({ name }))
          .bindAsync(mapBindAsync(asyncGetLasName(0)))
          .map(elements => ({
            ...elements,
            lastName: elements.newElement
          }))
          .bindAsync(mapBindAsync(asyncGetYears))
          .map(elements => ({
            ...elements,
            years: elements.newElement
          }))
          .map(elements => mapReduce(elements))
          .protectFailure(err => err.message)

      await resultAsync.then(result => {
        expect(result.isSuccess).to.be.false
        result.iterFailure(error => {
          expect(error).to.be.eql("Error Sakuragui Test")
        })
      })
    })

    it("mapFailure", async () => {
      const resultAsync = newFailureFromPromise<undefined, string>(asyncService())

      await resultAsync.mapFailure(value => value + "Kakaroto")
        .then(result => {
          expect(result.isSuccess).to.be.false
          expect(result.value).to.be.eql(RESULT_FUNC + "Kakaroto")
        })
    })

    it("map", async () => {
      const resultAsync = newFailureFromPromise<undefined, string>(asyncService())

      await resultAsync.map(value => value + "Kakaroto")
        .then(result => {
          expect(result.isSuccess).to.be.false
          expect(result.value).to.be.eql(RESULT_FUNC)
        })
    })

    it("newResultFromRule", async () => {
      const funRule = (value: string) =>
        value === RESULT_FUNC + "NO" ?
          newSuccess<string, string>(value) :
          newFailure<string, string>(value)

      const resultAsync = newResultFromRule<string, string, string>(asyncService(), funRule)

      await resultAsync.then(
        result => expect(result.isSuccess).to.be.false
      )
    })

    it("protect success", async () => {
      const value = async (flag: number) => {
        if (flag == 1) throw new Error("Test Error")
        return "test"
      }

      const resultAsync = newSuccessFromPromise<string, undefined>(value(1))
        .protectSuccess((e) => "Test is success")

      await resultAsync
        .then(result => {
          expect(result.isSuccess).to.be.true
          expect(result.value).to.be.eql("Test is success")
        })
    })

    it("protect failure", async () => {
      const value = async (flag: number) => {
        if (flag == 1) throw new Error("Test Error")
        return "test"
      }

      const resultAsync = newFailureFromPromise<string, string>(value(1))
        .protectFailure((e) => "Test is Failure")

      await resultAsync
        .then(result => {
          expect(result.isSuccess).to.be.false
          expect(result.value).to.be.eql("Test is Failure")
        })
    })

    it("create success front async function", async () => {
      const method = async () => {
        throw  Error("OK")
      }
      const result = await newSuccessFromAsyncFN<string, Error>(method, (e: Error) => "Error")

      expect(result.isSuccess).to.be.true
      expect(result.value).to.be.eql("Error")
    })

    it("failureToSuccess", async () => {
      const resultAsync = newFailureAsync<string, string>("origin-result-failure")
      const newresult = await failureToSuccess(resultAsync, "be-happend")

      expect(newresult.isSuccess).to.be.true
      newresult.iter(
        value => expect(value).to.be.eql("be-happend")
      )
    })

    it("retryResult", async () => {
      let counter = 0
      const resultAsyncFn = () => {
        counter++
        return newFailureAsync<string, string>("origin-result")
      }

      const expected = await retryResult(resultAsyncFn, 3, 10)
      expect(expected.isSuccess).to.be.false
      expect(counter).to.be.eq(3)
    })
  })
})
