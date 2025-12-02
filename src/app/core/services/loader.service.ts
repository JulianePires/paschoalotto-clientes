import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private loadingCount = 0;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  readonly loading$ = this.loadingSubject.asObservable();

  show() {
    this.loadingCount++;
    if (this.loadingCount > 0) {
      this.loadingSubject.next(true);
    }
  }

  hide() {
    this.loadingCount = Math.max(0, this.loadingCount - 1);
    if (this.loadingCount === 0) {
      this.loadingSubject.next(false);
    }
  }

  reset() {
    this.loadingCount = 0;
    this.loadingSubject.next(false);
  }
}
