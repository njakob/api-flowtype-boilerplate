// @flow

"use strict";

///////////////////

declare class Thenable<R> {
  then<U>(onFulfilled: (value: R) => U|Thenable<U>, onRejected?: (error: any) => U|Thenable<U>): Thenable<U>;
  then<U>(onFulfilled: (value: R) => U|Thenable<U>, onRejected?: (error: any) => void|Thenable<void>): Thenable<U>;
}

class PromiseInspection<T> {
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

class AggregateError extends Array { }

class PromiseHelper {

  static all<R>(values: Promise<R>[]): Promise<R[]> {
    return Promise.all(values);
  }

  static join<R>(...values: Promise<R>[]): Promise<R[]> {
    return Promise.all([...values]);
  }

  static settleAll<R>(promises): Promise<PromiseInspection<R>[]> {
    return Promise.all(promises.map(PromiseHelper.reflect));
  }

  static reflect<R>(promise: Promise<R>): Promise<PromiseInspection<R>> {
    return promise.then(
      r => PromiseInspection.fulfill(r),
      e => PromiseInspection.reject(e)
    );
  }

}

///////////////////

export default PromiseHelper;
export { AggregateError };
export { PromiseInspection };