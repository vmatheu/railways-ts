import { expect } from "chai";
import { mergeFiveRails, mergeFourRails, mergePairRails, mergeSixRails, mergeThreeRails, resolveArrayResultAsync } from "./merge-rails";
import {
  newResultFromAsyncFN,
} from "./result-async";

describe("merge rails test", () => {
  describe("execute promise in parallel", () => {
    const TIME = 1;
    const sleep = (mls: number, value: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, mls, value);
      });
    }
 
    const sleepReject = (mls: number): Promise<string> => {
      return new Promise((resolve, reject) => {
        setTimeout(reject, mls, "Error sleep");
      });
    }

    it("when have two promises and one error", async () => {
      const result = await mergePairRails(
          newResultFromAsyncFN<string>(() => sleep(TIME, "1")), 
          newResultFromAsyncFN<string>(() => sleepReject(TIME))
        )
      expect(result.isSuccess).to.be.false
      result.iterFailure(fail => {
        expect(fail[0].isSuccess).to.be.true
        expect(fail[1].isSuccess).to.be.false
      })
    })

    it("when have two promises with all success", async () => {
      const result = await mergePairRails(
          newResultFromAsyncFN<string>(() => sleep(TIME, "1")), 
          newResultFromAsyncFN<string>(() => sleep(TIME, "2"))
        )
      expect(result.isSuccess).to.be.true
      result.iter(value => expect(value).eql({ r1: '1', r2: '2' }))
    })

    it("when have three promises and two error", async () => {
      const result = await mergeThreeRails(
          newResultFromAsyncFN<string>(() => sleep(TIME, "1")), 
          newResultFromAsyncFN<string>(() => sleepReject(TIME)),
          newResultFromAsyncFN<string>(() => sleepReject(TIME))
        )
      expect(result.isSuccess).to.be.false
      result.iterFailure(fail => {
        expect(fail[0].isSuccess).to.be.true
        expect(fail[1].isSuccess).to.be.false
        expect(fail[2].isSuccess).to.be.false
      })
    })

    it("when have three promises with all success", async () => {
      const result = await mergeThreeRails(
          newResultFromAsyncFN<string>(() => sleep(TIME, "1")), 
          newResultFromAsyncFN<string>(() => sleep(TIME, "2")), 
          newResultFromAsyncFN<string>(() => sleep(TIME, "3"))
        )
      expect(result.isSuccess).to.be.true
      result.iter(value => expect(value).eql({ r1: '1', r2: '2', r3: '3' }))
    })

    it("when have array promises with error", async () => {
      const result = await resolveArrayResultAsync([
          newResultFromAsyncFN<string>(() => sleep(TIME, "1")), 
          newResultFromAsyncFN<string>(() => sleepReject(TIME)),
          newResultFromAsyncFN<string>(() => sleepReject(TIME))
        ]
        )
      expect(result.isSuccess).to.be.false
      result.iterFailure(fail => {
        expect(fail[0].isSuccess).to.be.true
        expect(fail[1].isSuccess).to.be.false
        expect(fail[2].isSuccess).to.be.false
      })
    })

    it("when have array promises with all success", async () => {
      const result = await resolveArrayResultAsync(
        [
          newResultFromAsyncFN<string>(() => sleep(TIME, "1")), 
          newResultFromAsyncFN<string>(() => sleep(TIME, "2")), 
          newResultFromAsyncFN<string>(() => sleep(TIME, "3"))
        ]
        )
      expect(result.isSuccess).to.be.true
      result.iter(value => expect(value).eql(['1', '2', '3']))
    })

    it("when have four promises and two error", async () => {
      const result = await mergeFourRails(
          newResultFromAsyncFN<string>(() => sleep(TIME, "1")), 
          newResultFromAsyncFN<string>(() => sleep(TIME, "2")), 
          newResultFromAsyncFN<string>(() => sleepReject(TIME)),
          newResultFromAsyncFN<string>(() => sleepReject(TIME))
        )
      expect(result.isSuccess).to.be.false
      result.iterFailure(fail => {
        expect(fail[0].isSuccess).to.be.true
        expect(fail[1].isSuccess).to.be.true
        expect(fail[2].isSuccess).to.be.false
        expect(fail[3].isSuccess).to.be.false
      })
    })

    it("when have four promises with all success", async () => {
      const result = await mergeFourRails(
          newResultFromAsyncFN<string>(() => sleep(TIME, "1")), 
          newResultFromAsyncFN<string>(() => sleep(TIME, "2")), 
          newResultFromAsyncFN<string>(() => sleep(TIME, "3")),
          newResultFromAsyncFN<string>(() => sleep(TIME, "4"))
        )
      expect(result.isSuccess).to.be.true
      result.iter(value => expect(value).eql({ r1: '1', r2: '2', r3: '3', r4: '4' }))
    })

    it("when have five promises and two error", async () => {
      const result = await mergeFiveRails(
          newResultFromAsyncFN<string>(() => sleep(TIME, "1")), 
          newResultFromAsyncFN<string>(() => sleep(TIME, "2")),
          newResultFromAsyncFN<string>(() => sleep(TIME, "3")), 
          newResultFromAsyncFN<string>(() => sleepReject(TIME)),
          newResultFromAsyncFN<string>(() => sleepReject(TIME))
        )
      expect(result.isSuccess).to.be.false
      result.iterFailure(fail => {
        expect(fail[0].isSuccess).to.be.true
        expect(fail[1].isSuccess).to.be.true
        expect(fail[2].isSuccess).to.be.true
        expect(fail[3].isSuccess).to.be.false
        expect(fail[4].isSuccess).to.be.false
      })
    })

    it("when have five promises with all success", async () => {
      const result = await mergeFiveRails(
          newResultFromAsyncFN<string>(() => sleep(TIME, "1")), 
          newResultFromAsyncFN<string>(() => sleep(TIME, "2")), 
          newResultFromAsyncFN<string>(() => sleep(TIME, "3")),
          newResultFromAsyncFN<string>(() => sleep(TIME, "4")),
          newResultFromAsyncFN<string>(() => sleep(TIME, "5"))
        )
      expect(result.isSuccess).to.be.true
      result.iter(value => expect(value).eql({ r1: '1', r2: '2', r3: '3', r4: '4', r5: '5' }))
    })

    it("when have six promises and two error", async () => {
      const result = await mergeSixRails(
          newResultFromAsyncFN<string>(() => sleep(TIME, "1")), 
          newResultFromAsyncFN<string>(() => sleep(TIME, "2")),
          newResultFromAsyncFN<string>(() => sleep(TIME, "3")),
          newResultFromAsyncFN<string>(() => sleep(TIME, "4")),  
          newResultFromAsyncFN<string>(() => sleepReject(TIME)),
          newResultFromAsyncFN<string>(() => sleepReject(TIME))
        )
      expect(result.isSuccess).to.be.false
      result.iterFailure(fail => {
        expect(fail[0].isSuccess).to.be.true
        expect(fail[1].isSuccess).to.be.true
        expect(fail[2].isSuccess).to.be.true
        expect(fail[3].isSuccess).to.be.true
        expect(fail[4].isSuccess).to.be.false
        expect(fail[5].isSuccess).to.be.false
      })
    })

    it("when have five promises with all success", async () => {
       const result = await mergeSixRails(
          newResultFromAsyncFN<string>(() => sleep(TIME, "1")), 
          newResultFromAsyncFN<string>(() => sleep(TIME, "2")), 
          newResultFromAsyncFN<string>(() => sleep(TIME, "3")),
          newResultFromAsyncFN<string>(() => sleep(TIME, "4")),
          newResultFromAsyncFN<string>(() => sleep(TIME, "5")),
          newResultFromAsyncFN<string>(() => sleep(TIME, "6"))
        )

        expect(result.isSuccess).to.be.true
        result.iter(value => expect(value).eql({ r1: '1', r2: '2', r3: '3', r4: '4', r5: '5', r6: '6' }))
    })
  })
})
