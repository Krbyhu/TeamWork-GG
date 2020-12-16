import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/user/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileListComponent } from './components/user/profile/profile-list/profile-list.component';
import { ProfileUpdateComponent } from './components/user/profile/profile-update/profile-update.component';
import { ForumListComponent } from './components/forum/forum-list/forum-list.component';
import { ForumFormComponent } from './components/forum/forum-form/forum-form.component';

import * as Guards from './_helpers/Guards';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: HomeComponent, canActivate: [Guards.LoginGuard]},
  { path: 'login', component: LoginComponent, canActivate: [Guards.LoginGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [Guards.LoginGuard]},
  { path: 'profile/:id', component: ProfileListComponent, canActivate: [Guards.AuthGuard]},
  { path: 'profile/edit/:id', component: ProfileUpdateComponent, canActivate: [Guards.AuthGuard]},
  { path: 'forum', component: ForumListComponent,canActivate: [Guards.AuthGuard]},
  { path: 'forum/new', component: ForumFormComponent, canActivate: [Guards.AuthGuard]},

  { path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
