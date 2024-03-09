import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  public busySubject = new Subject<boolean>();
  public busySubject$ = this.busySubject.asObservable();

  constructor() { }

  busy() {
    this.busySubject.next(true);
  }

  idle() {
    this.busySubject.next(false);
  }
}
