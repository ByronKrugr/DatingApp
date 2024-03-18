import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../_models/member';
import { Observable, map, of, take } from 'rxjs';
import { PaginatedResult } from '../_models/Pagination';
import { UserParams } from '../_models/UserParams';
import { AccountService } from './account.service';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private baseUrl = environment.apiUrl;
  private members: Member[] = [];
  private memberCache = new Map();
  private userParams: UserParams | undefined;
  private user: User | undefined;

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUserSource$.pipe(take(1)).subscribe(
      (user) => {
        if (user) {
          this.user = user;
          this.userParams = new UserParams(user);
        }
      }
    );
  }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(userParams: UserParams) {
    this.userParams = userParams
  }

  resetUserParams() {
    if (this.user) {
      this.userParams = new UserParams(this.user);
      return this.userParams;
    }
    return this.userParams;
  }

  getMembers(userParams: UserParams){
    const res = this.memberCache.get(Object.values(userParams).join('-'));
    if (res) return of(res);

    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);
    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);
    
    return this.getPaginatedList<Member[]>(this.baseUrl + "users", params).pipe(
      map(
        res => {
          this.memberCache.set(Object.values(userParams).join('-'), res);
          return res;
        }
      )
    );
  }

  private getPaginatedList<T>(url: string, params: HttpParams) {
    let paginatedResult: PaginatedResult<T> = new PaginatedResult<T>;

    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(res => {
        debugger;
        if (res.body) paginatedResult.result = res.body;
        const pagination = res.headers.get('Pagination');
        if (pagination) paginatedResult.pagination = JSON.parse(pagination);
        return paginatedResult;
      }
      ));
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    if (pageNumber && pageSize) {
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);
    }
    return params;
  }

  getMemberByUsername(username: string) {
    const member = [...this.memberCache.values()]
      .reduce((arr, e) => arr.concat(e.result), [])
      .find((m: Member) => m.userName === username)

    if (member) return of(member);

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

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + "users/set-main-photo/" + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + "users/delete-photo/" + photoId);
  }
  
}
