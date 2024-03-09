import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { AccountService } from '../_services/account.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SharedModule } from '../_modules/shared.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,MatButtonModule, MatButtonModule, 
    FormsModule, MatFormFieldModule, MatInputModule, 
    ReactiveFormsModule, MatDividerModule, MatSnackBarModule, 
    SharedModule],
    providers: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  @Output() cancelRegister = new EventEmitter();
  public registerForm!: FormGroup;
  private horizontalPos: MatSnackBarHorizontalPosition = 'end';
  private verticalPos: MatSnackBarVerticalPosition = 'bottom';

    constructor(
      private accountService: AccountService,
      private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe(
      () => {
        this.cancel(); 
      },
      error => {
        console.error(error);
        this.snackBar.open(error.error, "", {
          horizontalPosition: this.horizontalPos,
          verticalPosition: this.verticalPos
        })
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(true);
  }
}
