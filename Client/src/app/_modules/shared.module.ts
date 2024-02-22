import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService, accountServiceFactory } from '../_services/account.service';
import { HttpClient } from '@angular/common/http';
import { AccountModule } from './account.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
