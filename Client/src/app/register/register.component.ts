import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,MatButtonModule, MatButtonModule, 
    FormsModule, MatFormFieldModule, MatInputModule, 
    ReactiveFormsModule, MatDividerModule],
    providers: [AccountService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  @Output() cancelRegister = new EventEmitter();
  public registerForm!: FormGroup;

  constructor(private accountService: AccountService) {
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
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(true);
  }
}
