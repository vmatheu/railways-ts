# Railways TS

[![npm version](https://img.shields.io/npm/v/railways-ts)](https://www.npmjs.com/package/railways-ts)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/vmatheu/railways-ts/blob/main/LICENSE)

What is railway oriented programming?

https://blog.logrocket.com/what-is-railway-oriented-programming/

## Installation

You can install this library using npm:

```bash
npm install railways-ts

## Example Pipeline

const result = newSuccessAsync<string, string>("test")
    .map(mappingFunction)
    .ifSuccess(asynFuncTranforms)
    ...
