"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newFailure = exports.newSuccess = void 0;
const newSuccess = (value) => ({
    kind: 'SUCCESS',
    isSuccess: true,
    value,
    iter: doIterSuccess => { doIterSuccess(value); return newSuccess(value); },
    iterFailure: _ => newSuccess(value),
    either: doEitherSuccess => doEitherSuccess(value),
    map: mappingSuccess => newSuccess(mappingSuccess(value)),
    mapFailure: () => newSuccess(value),
    bindAsync: async (binderAsync) => await binderAsync(value),
    bindAsyncFailure: async (_) => newSuccess(value),
});
exports.newSuccess = newSuccess;
const newFailure = (value) => ({
    kind: 'FAILURE',
    isSuccess: false,
    value,
    iterFailure: doIterFailure => { doIterFailure(value); return newFailure(value); },
    iter: _ => newFailure(value),
    either: (_, doEitherFailure) => doEitherFailure(value),
    map: () => newFailure(value),
    mapFailure: mappingFailure => newFailure(mappingFailure(value)),
    bindAsync: async (_) => newFailure(value),
    bindAsyncFailure: async (binderAsyncFailure) => {
        const failure = await binderAsyncFailure(value);
        if (failure.kind === "SUCCESS") {
            throw new Error("bindAsyncFailure not support success rail");
        }
        return failure;
    }
});
exports.newFailure = newFailure;
