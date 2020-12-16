import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import * as Model from '../../models/Models';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  logIn(user: Model.IUser){
    return this.http.post(`${this.API_URI}/auth`, user, {observe : 'response'}).pipe(
        map(res => {
          localStorage.setItem('auth-token', res.headers.get('auth-token'));
          return res.body;
        }
      )
    )
  }

  logUp(user: Model.IUser){
    return this.http.post(`${this.API_URI}/auth/register`, user, {observe : 'response'}).pipe(
        map(res => {
          localStorage.setItem('auth-token', res.headers.get('auth-token'));
          return res.body;
        }
      )
    )
  }

  profile(id: string){
      return this.http.get(`${this.API_URI}/auth/profile/${id}`);
  }

  updateProfile(id: string|number, updatedUser: Model.IUser, updatedProfile: Model.IProfile): Observable<Model.IUser> {
    return this.http.put(`${this.API_URI}/auth/profile/${id}`, [updatedUser, updatedProfile]);
  }

  logOut(){
    localStorage.removeItem('auth-token');
    localStorage.removeItem('nombre_usuario');
    localStorage.removeItem('img');
    localStorage.removeItem('id_perfil');
  }
}


