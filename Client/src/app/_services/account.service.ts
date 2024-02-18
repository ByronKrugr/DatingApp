import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, map } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = "https://localhost:5001/api/";
  private currentUserSource = new BehaviorSubject<User | null>(null);
  public currentUserSource$ = this.currentUserSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  private setUserData(user: User | null) {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUserSource.next(user);
    }
  }

  login(model: any) {
    return this.httpClient.post<User>(this.baseUrl + "account/login", model).pipe(
      map((res: User) => {
        const user = res;
        this.setUserData(user);
      })
    );
  }

  register(model: any) {
    return this.httpClient.post<User>(this.baseUrl + "account/register", model).pipe(
      map((res: User) => {
        const user = res;
        this.setUserData(user);
      })
    );
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
