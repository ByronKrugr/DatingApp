import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BusyService } from '../_services/busy.service';
import { delay, finalize } from 'rxjs';

export const busyInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(BusyService);
  debugger;
  busyService.busy();
  
  return next(req).pipe(
    delay(1000),
    finalize(() => {
      debugger;
      busyService.idle();
    })
  );
};
