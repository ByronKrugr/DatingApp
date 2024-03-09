import { Component, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { MemberService } from '../../_services/member.service';
import { CommonModule } from '@angular/common';
import { MemberCardComponent } from '../member-card/member-card.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule, MemberCardComponent, MatCardModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})
export class MemberListComponent implements OnInit {
  public members: Member[] = [];

  constructor(private memberService: MemberService) {}

  ngOnInit() {
    this.getMembers();
  }

  private getMembers() {
    this.memberService.getMembers().subscribe(
      (res) => {
        this.members = res;
      },
      error => {
        console.error(error);
      }
    );
  }
}
