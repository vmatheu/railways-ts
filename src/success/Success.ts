export interface Success<SuccessType> {
    value: SuccessType,
    isSuccess: true
    kind: 'SUCCESS'
}
