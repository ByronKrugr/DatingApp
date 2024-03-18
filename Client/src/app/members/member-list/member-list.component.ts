import { Component, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { MemberService } from '../../_services/member.service';
import { CommonModule } from '@angular/common';
import { MemberCardComponent } from '../member-card/member-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginatedResult, Pagination } from '../../_models/Pagination';
import { AccountService } from '../../_services/account.service';
import { take } from 'rxjs';
import { User } from '../../_models/user';
import { UserParams } from '../../_models/UserParams';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; 
import { SelectData } from '../../_models/SelectData';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule, MemberCardComponent, MatCardModule,
    MatPaginatorModule, MatInputModule, MatButtonModule,
    MatSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})
export class MemberListComponent implements OnInit {
  public members: Member[] = [];
  pagination: Pagination | undefined;
  private user: User | undefined;
  private userParams: UserParams | undefined;
  public genders: SelectData[] = [
    {value: 'male', displayName: 'Male'},
    {value: 'female', displayName: 'Female'},
  ];
  public filterForm: FormGroup | undefined;

  constructor(
    private memberService: MemberService, 
    private fb: FormBuilder) {
    this.userParams = this.memberService.getUserParams();
  }

  ngOnInit() {
    this.loadMembers();

    this.filterForm = this.fb.group({
      minAge: [this.userParams?.minAge],
      maxAge: [this.userParams?.maxAge],
      gender: [this.userParams?.gender]
    });
  }

  private loadMembers() {
    // if (!this.userParams) return;
    if (this.userParams){
      this.memberService.setUserParams(this.userParams);

      // this.userParams = this.memberService.getUserParams();
      this.memberService.getMembers(this.userParams).subscribe({
        next: res => {
          debugger;
          if (res.result && res.pagination){
            this.members = res.result;
            this.pagination = res.pagination;
          }
        },
        // (res: any) => {
          // this.members = res.result;
          // this.pagination?.pageNumber = res.
        // },
        error: error => {
          console.error(error);
        }
      }); 
    }
  }

  pageChanged(event: any) {
    if (this.userParams && this.userParams?.pageNumber !== event.page) {
      this.userParams.pageNumber = event.pageIndex + 1;
      this.loadMembers();
    }
  }

  applyFilter() {
    if (!this.userParams) return;
    this.userParams.gender = this.filterForm?.value['gender'];
    this.userParams.maxAge = this.filterForm?.value['maxAge'];
    this.userParams.minAge = this.filterForm?.value['minAge'];
    this.loadMembers();
  }

  resetFilter() {
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }

  orderByLastActive() {
    if (!this.userParams) return;
    this.userParams.orderBy = "lastActive";
    this.loadMembers();
  }

  orderByCreated() {
    if (!this.userParams) return;
    this.userParams.orderBy = "created";
    this.loadMembers();
  }
}
