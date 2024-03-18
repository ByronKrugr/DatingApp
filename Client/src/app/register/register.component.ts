import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { AccountService } from '../_services/account.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SharedModule } from '../_modules/shared.module';
import { TextInputComponent } from '../_forms/text-input/text-input.component';
import { DateInputComponent } from '../_forms/date-input/date-input.component';
import { provideNativeDateAdapter } from '@angular/material/core'
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatButtonModule, 
    FormsModule, MatFormFieldModule, MatInputModule, 
    ReactiveFormsModule, MatDividerModule, MatSnackBarModule, 
    SharedModule, TextInputComponent, DateInputComponent, 
    MatRadioModule],
    providers: [provideNativeDateAdapter()],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  @Output() cancelRegister = new EventEmitter();
  public registerForm!: FormGroup;
  private horizontalPos: MatSnackBarHorizontalPosition = 'end';
  private verticalPos: MatSnackBarVerticalPosition = 'bottom';
  public validationErrors: string[] | undefined;

    constructor(
      private accountService: AccountService,
      private snackBar: MatSnackBar,
      private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(12)]],
      confirmPassword: ['', [Validators.required, this.validateMatch('password')]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      knownAs: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });
    this.registerForm.controls['password'].valueChanges.subscribe(
      _ => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    );
  }

  private validateMatch(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value == control.parent?.get(matchTo)?.value ? null : {noMatch: true};
    }
  }

  register() {
    const dob = this.getDateOnly(this.registerForm.controls['dateOfBirth'].value);
    const values = {...this.registerForm.value, dateOfBirth: dob};

    this.accountService.register(values).subscribe(
      () => {
        this.cancel(); 
      },
      error => {
        // console.error(error);
        // this.snackBar.open(error.error, "", {
        //   horizontalPosition: this.horizontalPos,
        //   verticalPosition: this.verticalPos
        // })
        console.error("error");
        console.error(error);
        this.validationErrors = error;
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(true);
  }

  private getDateOnly(dob: string | undefined) {
    if (!dob) return;
    let theDob = new Date(dob);
    return new Date(theDob.setMinutes(theDob.getMinutes() - theDob.getTimezoneOffset()))
      .toISOString().slice(0, 10);
  }
}
