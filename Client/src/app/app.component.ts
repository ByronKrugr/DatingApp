import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [AccountService],
  imports: [CommonModule, RouterOutlet, NavComponent, 
    HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(
    private accountService: AccountService
    ) {
  }
  
  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userInStorage = localStorage.getItem('user');
    if (!userInStorage) return;
    const user: User = JSON.parse(userInStorage);
    this.accountService.setCurrentUser(user);
  }
}
