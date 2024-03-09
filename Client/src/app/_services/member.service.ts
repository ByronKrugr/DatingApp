import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/member';
import { map, of, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private baseUrl = environment.apiUrl;
  private members: Member[] = [];

  constructor(private http: HttpClient) { }

  getMembers() {
    debugger;
    if (this.members.length > 0) {
      return of(this.members);
    }
    return this.http.get<Member[]>(this.baseUrl + "users").pipe(
      map(members => this.members = members)
    );
  }

  getMemberByUsername(username: string) {
    debugger;
    if (this.members.length > 0) {
      debugger;
      return of(this.members.find(m => m.userName === username));
    }
    return this.http.get<Member>(this.baseUrl + "users/" + username);
  }

  // getAuthorisationHeader()
  // {
  //   debugger;
  //   const headers = new HttpHeaders();
  //   const jwt = localStorage.getItem('token');
  //   // const jwt = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjZWxpbmEiLCJuYmYiOjE3MDg5NzQ5MTMsImV4cCI6MTcwOTU3OTcxMywiaWF0IjoxNzA4OTc0OTEzfQ.byDbbuvfigXTeAMIrbCtRhH07eB6jfdlPjkaEHcQ5-J2DRW7FOq1GYQV08twfQPJNH5tdfhaAGZFmw5eXOwzgQ";
  //   headers.append("Authorization", "Bearer " + jwt);
  //   return headers;
  // }

  updateMember(member: Member) {
    // const member = this.members[this.members.findIndex(m => m.userName === member.userName)];
    // this.members[this.members.findIndex(m => m.userName === member.userName)];
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        debugger;
        const index = this.members.indexOf(member);
        this.members[index] = {...this.members[index], ...member};
      })
    );
  }
  
}
