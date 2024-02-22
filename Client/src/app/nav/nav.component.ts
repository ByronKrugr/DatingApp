import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SharedModule } from '../_modules/shared.module';

@Component({
  selector: 'app-nav',
  standalone: true,
  providers: [],
  imports: [
    CommonModule, MatMenuModule,
    MatIconModule, MatToolbarModule, MatButtonModule, 
    MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    RouterLink, MatSnackBarModule, SharedModule
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  public title = 'Dating app';
  public logInForm!: FormGroup;
  private horizontalPos: MatSnackBarHorizontalPosition = 'end';
  private verticalPos: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    public accountService: AccountService,
    private router: Router, 
    private snackBar: MatSnackBar
    ) {
  }

  ngOnInit(): void {
    this.logInForm = new FormGroup({
      username: new FormControl('daniela'),
      password: new FormControl('Password1!')
    });
  }

  logIn() {
    this.accountService.login(this.logInForm.value).subscribe(
      _ => this.router.navigateByUrl("/members"),
      error => {
        debugger;
        this.snackBar.open(error.error, "", {
          horizontalPosition: this.horizontalPos,
          verticalPosition: this.verticalPos,
          duration: 5000,
          panelClass: ['error-snackbar']
        })
      },
      () => console.log("complete")
    )
  }

  logOut() {
    this.accountService.logout();
    this.router.navigateByUrl("/")
  }

}
