import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackbar = inject(MatSnackBar);
  const router = inject(Router);
  const horizontalPos: MatSnackBarHorizontalPosition = 'end';
  const verticalPos: MatSnackBarVerticalPosition = 'bottom';

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
        debugger;
        if (error) {
          switch (error.status){
            case 400:
              if (error.error.errors) {
                const modelStateErrors = [];
                debugger;
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modelStateErrors.push(error.error.errors[key]);
                  }
                }
                throw modelStateErrors.flat();
              }
              break;
            case 401:
              snackbar.open("Unauthorised", "", {
                horizontalPosition: horizontalPos,
                verticalPosition: verticalPos,
                panelClass: ['error-snackbar']
              })
              break;
            case 404:
              router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = { state : { error: error.error } };
              router.navigateByUrl('/server-error', navigationExtras);
              break;
            default:
              snackbar.open("Something unexpected went wrong", "", {
                horizontalPosition: horizontalPos,
                verticalPosition: verticalPos,
                duration: 5000,
                panelClass: ['error-snackbar']
              })
              break;
          }
        }
        throw error;
    })
  );
};
