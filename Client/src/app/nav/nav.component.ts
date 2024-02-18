import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { HttpClientModule } from '@angular/common/http';
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

@Component({
  selector: 'app-nav',
  standalone: true,
  providers: [AccountService],
  imports: [
    HttpClientModule, CommonModule, MatMenuModule,
    MatIconModule, MatToolbarModule, MatButtonModule, 
    MatFormFieldModule, MatInputModule, ReactiveFormsModule
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  public title = 'Dating app';
  public logInForm!: FormGroup;

  constructor(
    public accountService: AccountService
    ) {
  }

  ngOnInit(): void {
    this.logInForm = new FormGroup({
      username: new FormControl('bob3'),
      password: new FormControl('password1')
    });
  }

  logIn() {
    this.accountService.login(this.logInForm.value).subscribe(
      (res) => {        
        console.log(res);
    },
      error => {
        console.error(error);
      },
      () => {
        console.log("complete");
      }
    )
  }

  logOut() {
    this.accountService.logout();
  }

}
