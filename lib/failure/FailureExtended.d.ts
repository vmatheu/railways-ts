export declare type FailureType = {
    readonly kind: string;
    codeError?: string;
    messageError?: string;
};
export declare type FailureUsesCase = FailureType & {
    readonly usesCaseName: string;
    readonly description: string;
};
