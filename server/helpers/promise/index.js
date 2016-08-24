// @flow

"use strict";

///////////////////

export class PromiseInspection<T> {
  _reason: ?any;
  _value: ?T;
  _fulfilled: boolean;

  constructor (options: {
    fulfilled: boolean,
    reason?: any,
    value?: T
  }) {
    this._reason = options.reason;
    this._value = options.value;
    this._fulfilled = !!options.fulfilled;
  }

  reason(): ?any {
    return this._reason;
  }

  value(): ?T {
    return this._value;
  }

  isRejected(): boolean {
    return !this._fulfilled;
  }

  isFulfilled(): boolean {
    return this._fulfilled;
  }

  static fulfill(value: any): PromiseInspection<T> {
    return new PromiseInspection({ fulfilled: true, value: value });
  }

  static reject(reason: any): PromiseInspection<T> {
    return new PromiseInspection({ fulfilled: false, reason: reason });
  }

}

export class AggregateError extends Array { }

export function all<R>(values: Promise<R>[]): Promise<R[]> {
  return Promise.all(values);
}

export function join<R>(...values: Promise<R>[]): Promise<R[]> {
  return Promise.all([...values]);
}

export function settleAll<R>(promises: Promise<R>[]): Promise<PromiseInspection<R>[]> {
  return Promise.all(promises.map(reflect));
}

export function reflect<R>(promise: Promise<R>): Promise<PromiseInspection<R>> {
  return promise.then(
    r => PromiseInspection.fulfill(r),
    e => PromiseInspection.reject(e)
  );
}