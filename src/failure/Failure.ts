export interface Failure<FailureType> {
    isSuccess: false;
    value: FailureType;
    kind: 'FAILURE';
}