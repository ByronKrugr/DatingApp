import { Component, Input } from '@angular/core';
import { Member } from '../../_models/member';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule, RouterModule],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent {
  @Input() member: Member | undefined;

  constructor(private router: Router) {
  }

  goToMemberDetails(username: string) {
    this.router.navigateByUrl(`/members/${username}`);
  }
}
