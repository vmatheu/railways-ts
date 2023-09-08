type FailureHttpServiceName= {
    readonly nameService: string
}

type FailureHttpService400 = {
    readonly code: '400'
} & FailureHttpServiceName

type FailureHttpService500 = {
    readonly code: '500'
} & FailureHttpServiceName

 
type FailureHttpService = FailureHttpService400 | FailureHttpService500

const getFailureHttp400 = (nameService: string): FailureHttpService400 => ({
    code: '400',
    nameService: nameService
})

const getFailureHttp500 = (nameService: string): FailureHttpService500 => ({
    code: '500',
    nameService: nameService
})

export {
    FailureHttpService,
    FailureHttpService400,
    FailureHttpService500,
    getFailureHttp400,
    getFailureHttp500
}
