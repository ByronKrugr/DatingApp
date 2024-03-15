import { Component, HostListener, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { MemberService } from '../../_services/member.service';
import { AccountService } from '../../_services/account.service';
import { take } from 'rxjs';
import { User } from '../../_models/user';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { PhotoEditorComponent } from '../photo-editor/photo-editor.component';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatButtonModule,
    MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, 
    ReactiveFormsModule, MatSnackBarModule, PhotoEditorComponent],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.scss'
})
export class MemberEditComponent implements OnInit {
  public member: Member | undefined;
  public user: User | null = null;
  public editForm: FormGroup | undefined;
  public isFormReady = false;
  private horizontalPos: MatSnackBarHorizontalPosition = 'end';
  private verticalPos: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private memberService: MemberService, 
    private accountService: AccountService,
    private snackBar: MatSnackBar) {
    this.accountService.currentUserSource$.pipe(take(1)).subscribe(
      user => this.user = user
    );
  }

  ngOnInit(): void {
    this.getUser();
  }

  private buildForm() {
    this.editForm = new FormGroup({
      introduction: new FormControl(),
      lookingFor: new FormControl(),
      interests: new FormControl(),
      country: new FormControl(),
      city: new FormControl()
    });
    this.editForm.get('introduction')?.setValue(this.member?.introduction);
    this.editForm.get('lookingFor')?.setValue(this.member?.lookingFor);
    this.editForm.get('interests')?.setValue(this.member?.interests);
    this.editForm.get('country')?.setValue(this.member?.country);
    this.editForm.get('city')?.setValue(this.member?.city);
  }
  
  private getUser() {
    if (!this.user) return;
    this.memberService.getMemberByUsername(this.user.username).subscribe(
      member => {
        this.member = member;
        this.buildForm();
      }
    );
  }

  public saveChanges(event: any) {
    this.memberService.updateMember(this.editForm?.value).subscribe(
      () => {
        debugger;
        this.snackBar.open("You have successfully updated your profile", "", {
          horizontalPosition: this.horizontalPos,
          verticalPosition: this.verticalPos,
          duration: 5000,
          panelClass: ['success-snackbar']
        })
        this.editForm?.markAsPristine();
      },
      error => {
        debugger
      }
    );
  }

  @HostListener("window:beforeunload",["$event"])
  public unloadNotification(event: any) {
    if (this.editForm?.dirty)
      event.returnValue = true;
  }
}