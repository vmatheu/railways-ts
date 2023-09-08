export type FailureType = {
  readonly kind: string
  codeError?: string
  messageError?: string
}

export type FailureUsesCase = FailureType & {
  readonly usesCaseName: string
  readonly description: string
}
