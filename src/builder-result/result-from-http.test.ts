import { expect } from "chai";
import { buildResultFromHttp } from "./result-from-http";
describe("unit test for results http service", () => {
    const serviceTest = async (status: number) => ({ status, data: { name: 'goku' } })
    it("when have a response with errors", async () => {
      type NameObj = {
        name: string
      }
      const result400 = buildResultFromHttp<NameObj>(await serviceTest(400))
      expect(result400.isSuccess).to.be.false
      expect(result400.value).eql({
        code: '400',
        nameService: 'serviceTest'
      })

      const result500 = buildResultFromHttp<NameObj>(await serviceTest(500))
      expect(result500.isSuccess).to.be.false
      expect(result500.value).eql({
        code: '500',
        nameService: 'serviceTest'
      })
    })

    it("when have a response with success", async () => {
      type NameObj = {
        name: string
      }
      const result200 = buildResultFromHttp<NameObj>(await serviceTest(200))
      expect(result200.isSuccess).to.be.true
      expect(result200.value).eql({
        name: 'goku'
      })
    })
})
