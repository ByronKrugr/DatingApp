import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService, accountServiceFactory } from '../_services/account.service';
import { map } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from '../_modules/shared.module';

export const authGuard: CanActivateFn = () => {
  const accountService = inject(AccountService);
  const snackBar = inject(MatSnackBar)
  const horizontalPos: MatSnackBarHorizontalPosition = 'end';
  const verticalPos: MatSnackBarVerticalPosition = 'bottom';

  return accountService.currentUserSource$.pipe(
    map((user) => {
      // const user = null;
      if (user)
        return true
      else {
        snackBar.open("Ya'll shall not pass!", "", {
          horizontalPosition: horizontalPos,
          verticalPosition: verticalPos,
          duration: 5000,
          panelClass: ['error-snackbar']
        })
        return false;
      }
    })
  );
};
