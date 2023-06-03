import { ApplicationRef, Injectable, inject } from '@angular/core';
import { delay, firstValueFrom, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChangeDetectionCoordinator {
  private appRef = inject(ApplicationRef);
  private donePromise: Promise<void> | null = null;
  private resolveFn: (() => void) | null = null;

  // Coordinate a single change detection after 1 tick. Calling this multiple times synchronously will still result in a single change detection
  // This does actually still work with zoneless apps since we're not relying on ZoneJS here to perform the change detection.
  schedule() {
    if (this.donePromise) {
      return this.donePromise;
    }

    this.donePromise = new Promise((resolve) => {
      this.resolveFn = resolve;
    });

    firstValueFrom(of(null).pipe(delay(1))).then(() => {
      this.resolveFn?.();
      this.resolveFn = null;
      this.donePromise = null;
      this.appRef.tick();
    });

    return this.donePromise;
  }
}
