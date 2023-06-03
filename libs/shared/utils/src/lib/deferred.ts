export class DeferredPromise<T = unknown> {
  promise: Promise<T>;
  reject!: (reason?: unknown) => void;
  resolve!: (value: T) => void;
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.reject = reject;
      this.resolve = resolve;
    });
  }
}
