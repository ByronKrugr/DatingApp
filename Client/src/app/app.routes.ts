import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { authGuard } from './_guards/auth.guard';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { 
        path: '', 
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            { path: 'lists', component: ListsComponent },
            { path: 'messages', component: MessagesComponent },
            { path: 'members', component: MemberListComponent },
            { path: 'members/:username', component: MemberDetailsComponent },
        ] },
    { path: "not-found", component: NotFoundComponent },
    { path: "server-error", component: ServerErrorComponent },
    { path: "errors", component: TestErrorsComponent },
    { path: '**', component: NotFoundComponent, pathMatch: 'full' }
];
