import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './_modules/shared.module';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { BusyService } from './_services/busy.service';
import { Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [],
  imports: [CommonModule, RouterOutlet, NavComponent, 
    HomeComponent, SharedModule, NotFoundComponent,
    ServerErrorComponent, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  // public isBusy$ = this.busyService.busySubject$;
  public isBusy$: Observable<boolean> | undefined;

  constructor(
    private accountService: AccountService,
    private busyService: BusyService
    ) {
  }
  
  ngOnInit(): void {
    this.setCurrentUser();
    this.listenToBusy();
  }

  setCurrentUser() {
    debugger;
    const userInStorage = localStorage.getItem('user');
    if (!userInStorage) return;
    const user: User = JSON.parse(userInStorage);
    this.accountService.setCurrentUser(user);
  }

  listenToBusy() {
    this.isBusy$ = this.busyService.busySubject$;
  }
}
