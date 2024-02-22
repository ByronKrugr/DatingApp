import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService, accountServiceFactory } from '../_services/account.service';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [{
    provide: AccountService,
    useFactory: accountServiceFactory,
    deps: [HttpClient],
  }]
})
export class AccountModule { }
