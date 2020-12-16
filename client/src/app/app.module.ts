import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/user/register/register.component';
import { HomeComponent } from './components/user/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { NavigationComponent } from './components/partials/navigation/navigation.component';
import { ForumListComponent } from './components/forum/forum-list/forum-list.component';

import { ValidationService } from './services/validation/validation.service';
import { ProfileListComponent } from './components/user/profile/profile-list/profile-list.component';
import { ProfileUpdateComponent } from './components/user/profile/profile-update/profile-update.component';

import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { ForumFormComponent } from './components/forum/forum-form/forum-form.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    NavigationComponent,
    ProfileListComponent,
    ProfileUpdateComponent,
    ForumListComponent,
    ForumFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    FlashMessagesModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    Title,
    ValidationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
