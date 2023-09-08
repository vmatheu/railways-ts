import { FailureHttpService, getFailureHttp400, getFailureHttp500 } from "../failure"
import { newFailure, newSuccess } from "../result"

const buildResultFromHttp = <SuccessType>(response: {status: number, data: SuccessType}) => {
  switch (response.status) {
    case 400:
      return newFailure<SuccessType, FailureHttpService>(getFailureHttp400('serviceTest'))
    case 500:
        return newFailure<SuccessType, FailureHttpService>(getFailureHttp500('serviceTest'))
    case 200: 
        return newSuccess<SuccessType, FailureHttpService>(response.data)
  }
}

export {
  buildResultFromHttp
}