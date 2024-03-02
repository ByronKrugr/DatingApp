import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + "users", { headers: this.getAuthorisationHeader() });
  }

  getMemberByUsername(username: string) {
    return this.http.get<Member>(this.baseUrl + "users/" + username, { headers: this.getAuthorisationHeader()});
  }

  getAuthorisationHeader()
  {
    debugger;
    const headers = new HttpHeaders();
    const jwt = localStorage.getItem('token');
    // const jwt = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjZWxpbmEiLCJuYmYiOjE3MDg5NzQ5MTMsImV4cCI6MTcwOTU3OTcxMywiaWF0IjoxNzA4OTc0OTEzfQ.byDbbuvfigXTeAMIrbCtRhH07eB6jfdlPjkaEHcQ5-J2DRW7FOq1GYQV08twfQPJNH5tdfhaAGZFmw5eXOwzgQ";
    headers.append("Authorization", "Bearer " + jwt);
    return headers;
  }
}
