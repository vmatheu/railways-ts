declare type FailureHttpServiceName = {
    readonly nameService: string;
};
declare type FailureHttpService400 = {
    readonly code: '400';
} & FailureHttpServiceName;
declare type FailureHttpService500 = {
    readonly code: '500';
} & FailureHttpServiceName;
declare type FailureHttpService = FailureHttpService400 | FailureHttpService500;
declare const getFailureHttp400: (nameService: string) => FailureHttpService400;
declare const getFailureHttp500: (nameService: string) => FailureHttpService500;
export { FailureHttpService, FailureHttpService400, FailureHttpService500, getFailureHttp400, getFailureHttp500 };
