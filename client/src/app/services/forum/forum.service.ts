import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import * as Model from '../../models/Models';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<any>(`${this.API_URI}/forum`);
  }

  getID() {
    return this.http.get<any>(`${this.API_URI}/forum/new`);
  }

  newPost(newPost: Model.IForum, user: Model.IUser): Observable<Model.IForum> {
    return this.http.post(`${this.API_URI}/forum/new`, [newPost, user]);
  }

}

