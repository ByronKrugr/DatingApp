import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '../../_services/member.service';
import { Member } from '../../_models/member';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-member-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule,
    MatTabsModule, GalleryModule],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.css'
})
export class MemberDetailsComponent implements OnInit {
  public member: Member | undefined;
  public images: GalleryItem[] = [];

  constructor(
    private memberService: MemberService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getMemberDetails();
  }

  getMemberDetails() {
    const username = this.activatedRoute.snapshot.paramMap.get('username');
    console.log(username);
    if (!username) return;
    this.memberService.getMemberByUsername(username).subscribe(
      (res) => {
        this.member = res;
        this.getImages();
      },
      error => console.error(error)
    );
  }

  getImages() {
    if (!this.member) return;
    for (const photo of this.member.photos){
      this.images.push(new ImageItem({src: photo.url, thumb: photo.url}));
      this.images.push(new ImageItem({src: photo.url, thumb: photo.url}));
    }
  }
}
