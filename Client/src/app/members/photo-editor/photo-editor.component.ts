import { Component, Input, OnInit } from '@angular/core';
import { Photo } from '../../_models/photo';
import { FileUploadModule, FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';
import { take } from 'rxjs';
import { Member } from '../../_models/member';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MemberService } from '../../_services/member.service';

@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [FileUploadModule, MatButtonModule,
    CommonModule],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.scss'
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: Member | undefined;
  uploader: FileUploader | undefined;
  hasBaseDropZoneOver = false;
  baseUl = environment.apiUrl;
  user: User | undefined;

  constructor (private accountService: AccountService,
    private memberService: MemberService) {
    this.accountService.currentUserSource$.pipe(take(1)).subscribe(
      (user) => {
        if (user) this.user = user;
      }
    );
  }

  ngOnInit() {
    this.initialiseUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  initialiseUploader() {
    this.uploader = new FileUploader({
      url: this.baseUl + 'users/add-photo',
      authToken: 'Bearer ' + this.user?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.member?.photos.push(photo);
      }
    }

  }

  setMainPhoto(photo: Photo) {
    this.memberService.setMainPhoto(photo.id).subscribe(
      _ => {
        if (this.member && this.user) {
          this.user.photoUrl = photo.url;
          this.member.photoUrl = photo.url;
          this.accountService.setCurrentUser(this.user);
          for (let index = 0; index < this.member?.photos?.length; index++) {
            if (this.member?.photos[index].isMain) this.member.photos[index].isMain = false;
            if (this.member.photos[index].id == photo.id) this.member.photos[index].isMain = true;
          }
        }
        // this.member?.photos[pho]
        // this.member?.photos.forEach(photo => {
        //   if (photo.isMain) this.member?.photos
        // });
      }
    );
  }

  deletePhoto(photoId: number) {
    this.memberService.deletePhoto(photoId).subscribe({
      next: _ => {
        if (this.member) {
          this.member.photos = this.member.photos.filter(p => p.id != photoId);
        }
      }
    })
  }

}
